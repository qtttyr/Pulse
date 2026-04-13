import os
import json
import re
from typing import Dict, List, Any
from google import genai

from dotenv import load_dotenv
from app.services.filter import mask_secrets, is_source_file, extract_functions

load_dotenv()

SYSTEM_PROMPT = """
You are the PULSE Engine, a Senior Software Architect AI. 
Your goal is to perform a deep architectural "X-Ray" of a codebase.

Pulse Algorithm Overview:
1. Dependency Mapping: Analyzing how files relate to each other.
2. Symbol Extraction: Identifying core functions/classes to gauge complexity.
3. Verdict Generation: Providing a modularity score, tech debt audit, and innovation insights.
4. Detailed Feedback: A full markdown report with specific file/function references.

If the user asks about a specific function, use the provided Symbol List to locate it.
"""

def get_ai_client():
    """Lazily initialize the client to prevent startup crashes if key is missing."""
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        print("Warning: GEMINI_API_KEY is not set. AI analysis will use simplified output.")
        return None
    return genai.Client(api_key=key)

async def analyze_with_ai(graph_data: Dict[str, Any], repo_path: str) -> Dict[str, Any]:
    """
    Sends the graph structure and key files to Gemini for an architectural verdict.
    Ensures secrets are filtered before sending.
    """
    try:
        client = get_ai_client()
        if not client:
            return {
                "score": 0,
                "tech_debt": "API Key Missing",
                "innovation": "N/A",
                "architecture_type": "N/A",
                "top_finding": "Set GEMINI_API_KEY to enable full AI diagnostics.",
                "detailed_feedback": "Please add `GEMINI_API_KEY` to your `.env` file to see the full architectural report."
            }

        nodes_list = [n["id"] for n in graph_data["nodes"] if n.get("type") == "file"]
        
        priority_files = [
            "package.json", "requirements.txt", "main.py", "App.tsx", 
            "docker-compose.yml", "Dockerfile", "README.md", "vite.config.ts"
        ]
        
        selected_files = [f for f in priority_files if f in nodes_list]
        
        other_files = [n for n in nodes_list if n not in selected_files and is_source_file(n)]
        selected_files.extend(other_files[:max(0, 20 - len(selected_files))])
        
        files_context: str = ""
        symbols_index: Dict[str, List[str]] = {}
        
        for f in selected_files:
            f_path = os.path.join(repo_path, f)
            if os.path.exists(f_path):
                try:
                    with open(f_path, "r", encoding="utf-8", errors="ignore") as file:
                        content = file.read()
                        safe_content_str: str = mask_secrets(content)
                        
                        symbols = extract_functions(content)
                        symbols_index[f] = symbols
                        
                        snippet = safe_content_str[:1000]
                        files_context += f"\n--- FILE: {f} ---\nSYMBOLS: {', '.join(symbols)}\nCONTENT:\n{snippet}\n"
                except:
                    continue
        
        prompt = f"""
Provide an architectural verdict for this repository.
Project structure/Nodes: {', '.join(nodes_list[:100])}...

Selected Files Content:
{files_context}

Analyze the architecture, dependencies, and code quality.
Identify the most 'elegant' or 'innovative' code snippet (The Gold Nugget).
Evaluate 'Impact Score' based on architectural significance and complexity.

Output valid JSON only:
{{
  "score": 85,
  "impact_score": 90,
  "metrics": {{
    "modularity": 80,
    "scalability": 75,
    "quality": 85,
    "readability": 90,
    "complexity": 70,
    "performance": 80
  }},
  "gold_nugget": {{
    "file": "filename.ts",
    "explanation": "Brief explanation of elegance.",
    "snippet": "code..."
  }},
  "tech_debt": "One sentence summary",
  "innovation": "One sentence summary",
  "architecture_type": "Modular/Monolith/etc",
  "top_finding": "One sentence summary",
  "detailed_feedback": "USE RICH MARKDOWN. Use H3 headers (###), bold (**), and lists. Do not use raw # tags without space. Make it look professional and structured."
}}
"""
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            )
        )
        
        raw_content = response.text
        
        match = re.search(r'(\{.*\})', raw_content, re.DOTALL)
        if match:
            raw_content = match.group(1)
            
        try:
            verdict = json.loads(raw_content)
        except:
             raise ValueError("LLM response did not contain valid JSON")
            
        return verdict
        
    except Exception as e:
        print(f"AI Analysis Logic Error: {str(e)}")
        return {
            "score": 65,
            "tech_debt": "Analysis logic fallback due to error.",
            "innovation": "Multi-layer graph visualization",
            "architecture_type": "Standard Repository",
            "top_finding": "Error during deep scan. FALLBACK: The project appears to have a standard JS/Python structure.",
            "detailed_feedback": f"### AI Analysis Error\nWe couldn't perform a deep architectural scan because: `{str(e)}`.\n\nHowever, we detected {len(nodes_list)} nodes in your project. It looks like a standard web application."
        }