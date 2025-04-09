//ProfilePage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "./PageLayout";
import { Row } from "react-bootstrap";
import React, { useState } from 'react';


type TaskCategory = {
    id: number;
    taskCategory: string;
  }

  const ProfilePage: React.FC = () =>{
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [categories, setCategories] = useState<TaskCategory[]>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    
      const addTaskCategory = (): void => {
        if (newCategory.trim() !== '') {
          const newTaskCategory: TaskCategory = {
            id: Date.now(),
            taskCategory: newCategory,
          };
    
          setCategories([...categories, newTaskCategory]);
          setNewCategory('');
        }
      };
    
      const deleteTaskCategory = (id: number): void => {
        setCategories((prevCategories) => prevCategories.filter((namedCategory) => namedCategory.id !== id));
      };

    if(!isAuthenticated){
        return <div>Not authenticated</div>
    }

    if(!user){
        return <div>No user profile</div>
    }

    getAccessTokenSilently().then(token => console.log('token', token))

    return(
        <PageLayout>
            <h1>Welcome</h1>
            <h3>{user.name}</h3>
                {user?.picture && <img src={user.picture} alt={user.name} />}
                
                <div>
                 <div className='d-flex todo-list'>
                  <Row>
                    <h2 className='title'>Task Categories:</h2>      
                        {categories.map((namedCategory) => (
                        <div key={namedCategory.id}>
                            {namedCategory.taskCategory}
                            <button onClick={() => deleteTaskCategory(namedCategory.id)}>🗑️</button>
                        </div>
                        ))}
                    </Row>
                    
                    <div className="input-group">
                        <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="form-control me-2"
                        />
                        <button onClick={addTaskCategory} className="btn btn-primary">Add Task Category</button>
                    </div>
                    </div>
                </div>
        </PageLayout>
    )
}

export default ProfilePage;