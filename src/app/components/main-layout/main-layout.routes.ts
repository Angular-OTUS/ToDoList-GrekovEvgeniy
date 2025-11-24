import { Routes } from '@angular/router';

export const mainLayoutRoutes: Routes = [
    { 
        path: '', 
        redirectTo: 'board', 
        pathMatch: 'full' 
    },
    {
        path: 'board',
        loadComponent: () => import('../board/board').then(c => c.Board),
    }, 
    {
        path: 'backlog',
        loadComponent: () => import('../to-do-list/to-do-list').then(c => c.ToDoList),
        children: [
            {
                path: ':id',
                loadComponent: () => import('../to-do-item-view/to-do-item-view').then(c => c.ToDoItemView),
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'board'
    }
];
