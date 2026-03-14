from fastapi import APIRouter
from app.services.article_service import fetch_topics, fetch_articles

router = APIRouter(prefix="/public", tags=["Public"])

@router.get("/topics")
async def topics():
    return await fetch_topics()

@router.get("/articles/{topic}")
async def articles(topic: str):
    return await fetch_articles(topic)
@router.get("/privacy-policy")
async def privacy_policy():
    return {
        "policy": "This healthcare portal stores patient wellness data securely and follows privacy protection guidelines."
    }