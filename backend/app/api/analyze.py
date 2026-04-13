from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from typing import List, Dict, Any
import os
import shutil
import tempfile
from urllib.parse import urlparse

from app.services.fetcher import clone_repository
from app.services.graph_gen import analyze_dependencies
from app.services.openrouter import analyze_with_ai

router = APIRouter()

class AnalyzeRequest(BaseModel):
    repo_url: str

    @field_validator('repo_url')
    @classmethod
    def validate_github_url(cls, v: str) -> str:
        if not v:
            raise ValueError('URL cannot be empty')
        
        parsed = urlparse(v)
        
        if parsed.scheme not in ('http', 'https'):
            raise ValueError('URL must start with http:// or https://')
        
        if 'github.com' not in parsed.netloc:
            raise ValueError('Only GitHub repositories are supported')
        
        path = parsed.path.strip('/')
        if not path or '/' not in path:
            raise ValueError('Invalid GitHub URL format. Expected: https://github.com/owner/repo')
        
        return v

class AnalyzeResponse(BaseModel):
    status: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    verdict: Dict[str, Any]

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_repo(request: AnalyzeRequest):
    # Create a temp directory
    temp_dir = tempfile.mkdtemp()
    print(f"🚀 Starting analysis for: {request.repo_url}", flush=True)
    
    try:
        # 1. Clone repository
        repo_path = os.path.join(temp_dir, "repo")
        os.makedirs(repo_path, exist_ok=True)
        print("🔗 Step 1: Cloning repository...", flush=True)
        clone_repository(request.repo_url, repo_path)
        print("✅ Cloning complete.", flush=True)

        # 2. Safety Check
        file_count = 0
        for root, dirs, files in os.walk(repo_path):
            # Optimization: skip .git and node_modules manually here
            if '.git' in dirs: dirs.remove('.git')
            if 'node_modules' in dirs: dirs.remove('node_modules')
            file_count += len(files)
        
        print(f"📁 Total files found (filtered): {file_count}", flush=True)
        if file_count > 300:
            raise HTTPException(
                status_code=413, 
                detail=f"Repository too large ({file_count} files). Pulse free-tier limit is 300 files."
            )
        
        # 3. Analyze dependencies
        print("📊 Step 2: Analyzing dependencies...", flush=True)
        graph_data = analyze_dependencies(repo_path, repo_path)
        
        # 4. AI Analysis
        print(f"🤖 Step 3: AI Analysis via Gemini...", flush=True)
        verdict = await analyze_with_ai(graph_data, repo_path)
        
        return {
            "status": "success",
            "nodes": graph_data["nodes"],
            "edges": graph_data["edges"],
            "verdict": verdict
        }
        
    except Exception as e:
        print(f"❌ Analysis failed: {str(e)}", flush=True)
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)
        print("✨ Done.", flush=True)
