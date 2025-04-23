import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold mb-6">Conversations</h1>
      <div class="flex gap-4 items-center">
        <span class="text-gray-700">{{ auth.user()?.username|titlecase }}</span>
        <button class="bg-red-500 text-white p-2 rounded" (click)="doLogout()">Logout</button>
      </div>
    </div>
    <div class="p-8">
      <div [hidden]="conversations().length === 0" *ngFor="let convo of conversations()" class="border-b py-2 cursor-pointer hover:bg-gray-100" (click)="openChat(convo.id)">
        {{ convo.name }}
      </div>
      <div [hidden]="conversations().length > 0" class="border-b py-2 cursor-pointer">
        No conversations created..
      </div>

    </div>
    <div class="p-8">
      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        (click)="openNewConversationModal()">
          + New Conversation
      </button>
    </div>

    <div *ngIf="showModal()" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div class="bg-white p-6 rounded shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Create New Conversation</h2>
      
      <input
        class="border p-2 w-full mb-4"
        placeholder="Conversation Name"
        [(ngModel)]="newConversationName"
        (ngModelChange)="newConversationName.set($event)"
      />

      <div class="flex justify-end space-x-2">
        <button 
          class="bg-gray-300 px-4 py-2 rounded"
          (click)="showModal.set(false)">
          Cancel
        </button>
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded"
          (click)="createConversation()">
          Create
        </button>
      </div>
    </div>
</div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsPage implements OnInit {
  conversations = signal<{ id: number, name: string }[]>([]);
  newConversationName = signal('');
  showModal = signal(false);

  constructor(private api: ApiService, private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.api.get<{ id: number, name: string }[]>('/conversations')
      .subscribe(data => this.conversations.set(data));
  }

  openChat(id: number) {
    this.router.navigate(['/chat', id]);
  }

  openNewConversationModal() {
    this.showModal.set(true);
  }

  createConversation() {
    if (!this.newConversationName()) return;

    const newConversation = {
      name: this.newConversationName()
    };

    this.api.post('/conversations', newConversation).subscribe({
      next: (data) => {
        // After creating, refresh the conversation list
        this.conversations.update((old: any) => [...old, data]);
        this.newConversationName.set('');
        this.showModal.set(false);
      },
      error: (err) => {
        alert('Failed to create conversation');
      }
    });
  }

  doLogout() {
    this.auth.user.set({ username: "" });
    this.router.navigate(['/']);
    this.auth.isAuthenticated.set(false);
  }
}
