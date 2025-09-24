
from agents import function_tool

@function_tool
def translation_tool(text: str, target_language: str) -> str:
    # Dummy implementation of a translation tool
    return f"Translated '{text}' to {target_language}"