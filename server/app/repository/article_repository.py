from app.database import db

async def get_topics():
    topics = []
    cursor = db.health_topics.find()

    async for t in cursor:
        t["_id"] = str(t["_id"])
        topics.append(t)

    return topics


async def get_articles_by_topic(topic: str):
    articles = []
    cursor = db.health_articles.find({"topic": topic})

    async for a in cursor:
        a["_id"] = str(a["_id"])
        articles.append(a)

    return articles