import json
import logging
from typing import Dict, Any, Optional
from ..config import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are GuruDev (The Blind Spot), an advanced AI thinking companion and cognitive audit engine.
Your purpose is to help the user uncover potential blind spots, question unspoken assumptions, and explore lateral perspectives regarding a difficult decision.

IMPORTANT CONSTRAINTS:
1. NEVER decide for the user. Do not tell them which option is 'better' or what they 'should' do.
2. Maintain neutral, dialectic, and Socratic rigor.
3. Help the user recognize factors they may have overlooked (e.g. academic load vs industry burnout, mentorship quality vs menial tasks, long-term opportunity cost vs immediate financial reward).
4. Return ONLY a valid JSON object matching the requested schema. No markdown formatting, no code fencing, pure JSON.
"""

def get_gemini_client():
    """Initialize official google-genai client if API key is present"""
    if not settings.GEMINI_API_KEY:
        return None
    try:
        from google import genai
        return genai.Client(api_key=settings.GEMINI_API_KEY)
    except Exception as e:
        logger.error(f"Failed to initialize Google GenAI Client: {e}")
        return None

def analyze_decision(
    headline: str,
    background: Optional[str] = "",
    options: Optional[list] = None,
    rationale: Optional[str] = "",
    criteria: Optional[list] = None,
    concerns: Optional[str] = ""
) -> Dict[str, Any]:
    """Execute decision blind spot analysis using Google Gemini"""
    client = get_gemini_client()
    
    prompt = f"""Conduct a thorough cognitive blind-spot audit on this decision:

DECISION HEADLINE: {headline}
SITUATIONAL BACKGROUND: {background or 'Not provided'}
OPTIONS CONSIDERED: {', '.join(options) if options else 'Not specified'}
CURRENT INTUITION / RATIONALE: {rationale or 'Not articulated'}
PRIORITIZED CRITERIA: {', '.join(criteria) if criteria else 'Not specified'}
DOWN-SIDE CONCERNS: {concerns or 'None mentioned'}

Return a single JSON object with this exact structure:
{{
  "summary": "Concise 2-sentence summary of the dilemma and core conflict.",
  "current_lean": "Analysis of what the user is currently gravitating toward and why.",
  "balance_score": 52,
  "dimensions_analyzed": 4,
  "pathways_count": 2,
  "blind_spots": [
    {{
      "id": 1,
      "title": "Title of blind spot (e.g. Academic Schedule Compression)",
      "description": "Specific overlooked friction or risk.",
      "impact": "Concrete consequence on user's trajectory.",
      "badge": "Severe Friction"
    }},
    {{
      "id": 2,
      "title": "Title of second blind spot (e.g. Learning Velocity vs Maintenance)",
      "description": "Risk of routine work overshadowing promised high-growth mentorship.",
      "impact": "Skills plateau despite brand prestige.",
      "badge": "Quality Divergence"
    }},
    {{
      "id": 3,
      "title": "Title of third blind spot (e.g. Mentorship Scarcity)",
      "description": "Unverified assumption about senior engineering availability.",
      "impact": "Independent struggle without safety net.",
      "badge": "Mentorship Risk"
    }}
  ],
  "assumptions": [
    {{
      "id": 1,
      "assumption": "The explicit or implicit premise the user is relying upon.",
      "challenge": "Why this premise may be flawed or incomplete.",
      "falsification_question": "Socratic question to test if this premise holds true."
    }},
    {{
      "id": 2,
      "assumption": "Second implicit assumption.",
      "challenge": "Counter-hypothesis.",
      "falsification_question": "Socratic probe."
    }}
  ],
  "trade_offs": [
    {{
      "dimension": "Short-term Gain vs Long-term Compounding",
      "short_term": "Immediate positive benefit.",
      "long_term": "Delayed or hidden cost."
    }},
    {{
      "dimension": "Autonomy vs Security",
      "short_term": "Predictable runway.",
      "long_term": "Opportunity cost of missed exploration."
    }}
  ],
  "alternative_paths": [
    {{
      "name": "Creative Lateral Option (e.g. The 3-Month Ignition Trial)",
      "proposal": "Actionable negotiated pathway that avoids binary all-or-nothing framing."
    }},
    {{
      "name": "The Hybrid / Part-time Bridge",
      "proposal": "Negotiating reduced hours to preserve core foundations."
    }}
  ],
  "reflection_questions": [
    {{
      "id": "q1",
      "title": "Decisive Falsification Test",
      "question": "What specific new evidence or condition would make you decisively walk away before committing?",
      "hint": "Pre-commits your exit criteria before emotional attachment takes over."
    }},
    {{
      "id": "q2",
      "title": "Direct Reality Probe",
      "question": "What primary source have you not yet consulted to verify day-to-day reality?",
      "hint": "Bypasses secondhand assurances."
    }},
    {{
      "id": "q3",
      "title": "Asymmetric Risk Calibration",
      "question": "If the worst-case scenario unfolds for 6 months, how easily reversible is the outcome?",
      "hint": "Evaluates two-way door vs one-way door decision stakes."
    }}
  ]
}}"""

    if client:
        try:
            response = client.models.generate_content(
                model=settings.GEMINI_MODEL,
                contents=prompt,
            )
            raw_text = response.text.strip()
            # Clean possible markdown formatting
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            parsed = json.loads(raw_text.strip())
            return parsed
        except Exception as e:
            logger.error(f"Gemini API execution error: {e}")
            # Fall through to default structured dialectic audit

    # Fallback Dialectic Model (ensures local hackathon testing functions gracefully even before API key is input)
    return {
        "summary": f"Audit of decision: '{headline}'. Analyzing trade-offs between immediate motivations and systemic long-term factors.",
        "current_lean": rationale or "Leaning toward the option with highest immediate certainty, while weighing implicit workload frictions.",
        "balance_score": 52,
        "dimensions_analyzed": len(criteria) if criteria else 4,
        "pathways_count": len(options) if options else 2,
        "blind_spots": [
            {
                "id": 1,
                "title": "Capacity & Bandwidth Compression",
                "description": "Underestimating cognitive switching costs between demanding concurrent responsibilities.",
                "impact": "Cumulative exhaustion eroding performance in both primary and secondary domains.",
                "badge": "High Friction"
            },
            {
                "id": 2,
                "title": "Signal vs Substance Divergence",
                "description": "Overvaluing external prestige or headline compensation over actual day-to-day mentorship and autonomy.",
                "impact": "High-effort investment with lower than anticipated pedagogical return.",
                "badge": "Value Misalignment"
            },
            {
                "id": 3,
                "title": "Binary Framing Trap",
                "description": "Treating the dilemma as an all-or-nothing choice rather than exploring staged trials or negotiated variations.",
                "impact": "Premature commitment to suboptimal trade-offs.",
                "badge": "Structural Trap"
            }
        ],
        "assumptions": [
            {
                "id": 1,
                "assumption": "High upfront reward guarantees equivalent skill acquisition and career leverage.",
                "challenge": "Market compensation often reflects immediate operational demand rather than learning investment.",
                "falsification_question": "If the compensation were equal to alternatives, which pathway offers greater 3-year leverage?"
            },
            {
                "id": 2,
                "assumption": "You can sustain 50+ hours of combined commitments without compromising foundational grades or health.",
                "challenge": "Mental fatigue compounds non-linearly across a multi-month period.",
                "falsification_question": "What is your concrete contingency plan if your stamina dips by week 8?"
            }
        ],
        "trade_offs": [
            {
                "dimension": "Immediate Financial / Social Runway vs Deep Mastery",
                "short_term": "Captures instant tangible milestones.",
                "long_term": "May sacrifice foundational concepts that unlock higher ceiling later."
            },
            {
                "dimension": "Institutional Safety vs High-Entropy Learning",
                "short_term": "Predictable expectations and low volatility.",
                "long_term": "Reduced exposure to asymmetric upside and lateral problem-solving."
            }
        ],
        "alternative_paths": [
            {
                "name": "The Phased Ignition Negotiation",
                "proposal": "Propose a 3-month initial term or part-time trial with formal check-in to verify mutual expectations before 6-month lock-in."
            },
            {
                "name": "The Hybrid Co-Op Structure",
                "proposal": "Negotiate 20 hours/week or remote flexibility aligned with academic exam windows."
            }
        ],
        "reflection_questions": [
            {
                "id": "q1",
                "title": "Decisive Falsification Test",
                "question": "What specific new information or condition would make you decisively walk away from this offer before signing?",
                "hint": "Forces you to define non-negotiables before sunk-cost investment sets in."
            },
            {
                "id": "q2",
                "title": "Direct Reality Probe",
                "question": "Have you directly spoken with peers currently in this exact role to verify daily work autonomy?",
                "hint": "Bypasses recruiting narratives with empirical evidence."
            },
            {
                "id": "q3",
                "title": "Asymmetric Trade-off Check",
                "question": "If this role forces a lower grade in your core sequence, does the industry experience still yield net positive leverage?",
                "hint": "Tests whether short-term prestige outweighs long-term fundamental depth."
            }
        ]
    }

def generate_socratic_reply(question_context: str, user_answer: str) -> str:
    """Generate a brief Socratic follow-up without deciding for the user"""
    client = get_gemini_client()
    if not client:
        return "That reveals a significant premise in your reasoning. How would you test this premise before making a permanent commitment?"
    
    prompt = f"""The user is reflecting on a critical thinking prompt regarding their decision.
Socratic prompt: {question_context}
User's reflection: {user_answer}

Respond with exactly 1 or 2 concise, thoughtful Socratic questions that challenge them to dig deeper.
DO NOT tell them what to decide. Encourage them to verify assumptions."""

    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        logger.error(f"Gemini Socratic reply error: {e}")
        return "That provides valuable clarity. What piece of missing evidence would challenge that assumption?"
