import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login.page').then(m => m.LoginPage)
    },
    {
        path: 'conversations',
        loadComponent: () => import('./features/conversations/conversations.page').then(m=>m.ConversationsPage),
    },
    {
        path: 'chat/:id',
        loadComponent: () => import('./features/chat/chat.page').then(m => m.ChatPage),
    },
    { path: '**', redirectTo: '' },
];
