def test_create_todo_long_title(client):
    long_title = "a" * 10001
    response = client.post("/todos/", json={"title": long_title})
    # Expect 422 Unprocessable Entity due to Pydantic max_length=200
    assert response.status_code == 422 

def test_create_todo_invalid_category(client):
    response = client.post("/todos/", json={"title": "Task", "category_id": 9999})
    # Due to our Service layer manual check, this should return 400
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid category_id"

def test_create_category_empty_name(client):
    response = client.post("/categories/", json={"name": ""})
    # Expect 422 because Pydantic min_length=1
    assert response.status_code == 422

def test_create_duplicate_category(client):
    client.post("/categories/", json={"name": "Unique"})
    response = client.post("/categories/", json={"name": "Unique"})
    # Service layer catches duplicate constraint
    assert response.status_code == 400
    assert response.json()["detail"] == "Category name already exists"
