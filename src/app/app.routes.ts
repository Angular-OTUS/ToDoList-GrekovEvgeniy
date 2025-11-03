import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'tasks', 
        pathMatch: 'full' 
    },
    {
        path: 'tasks',
        loadComponent: () => import('./components/to-do-list/to-do-list').then(c => c.ToDoList),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then(c => c.ToDoItemView),
            }
        ]
    }, 
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
