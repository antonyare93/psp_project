from fastapi import FastAPI, Query
from models import *

app = FastAPI(redoc_url=None)

@app.get("/api/users")
def get_users(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    """
    Entrega una lista de usuarios con paginacion y todas sus propiedades
    """
    # Pendiente de implementar
    return {"message": "hola"}

