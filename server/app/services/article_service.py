from app.repository.article_repository import get_topics, get_articles_by_topic

async def fetch_topics():
    topics = await get_topics()
    return {"topics": topics}

async def fetch_articles(topic: str):
    articles = await get_articles_by_topic(topic)
    return {"articles": articles}