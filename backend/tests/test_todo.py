def test_create_todo(client, test_db):
    response = client.post("/todos/", json={"title": "Test basic todo", "is_completed": False})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test basic todo"
    assert data["id"] is not None

def test_read_todos(client):
    client.post("/todos/", json={"title": "Test basic todo 1", "is_completed": False})
    response = client.get("/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

def test_update_todo(client):
    res_post = client.post("/todos/", json={"title": "Test todo", "is_completed": False})
    todo_id = res_post.json()["id"]

    response = client.put(f"/todos/{todo_id}", json={"title": "Updated todo", "is_completed": True})
    assert response.status_code == 200
    assert response.json()["title"] == "Updated todo"
    assert response.json()["is_completed"] == True

def test_delete_todo(client):
    res_post = client.post("/todos/", json={"title": "Test todo", "is_completed": False})
    todo_id = res_post.json()["id"]

    response = client.delete(f"/todos/{todo_id}")
    assert response.status_code == 200

    response = client.get(f"/todos/{todo_id}")
    assert response.status_code == 404
