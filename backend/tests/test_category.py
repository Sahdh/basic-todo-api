def test_create_category(client):
    response = client.post("/categories/", json={"name": "Work"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Work"

def test_read_categories(client):
    client.post("/categories/", json={"name": "Work"})
    client.post("/categories/", json={"name": "Personal"})
    
    response = client.get("/categories/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

def test_create_todo_with_category(client):
    cat_response = client.post("/categories/", json={"name": "Work"})
    cat_id = cat_response.json()["id"]

    todo_response = client.post("/todos/", json={"title": "Write TRD", "category_id": cat_id})
    assert todo_response.status_code == 200
    data = todo_response.json()
    assert data["category_id"] == cat_id
    assert data["category"]["name"] == "Work"
