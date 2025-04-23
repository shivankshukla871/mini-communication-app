import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-screen p-8">
      <div class="flex-1 overflow-y-auto space-y-2 mb-4">
        <div *ngFor="let msg of messages()" class="bg-gray-100 p-2 rounded">
          {{ msg.content }}
        </div>
      </div>

      <form (submit)="sendMessage()" class="flex">
        <input [(ngModel)]="draft" name="draft" type="text" class="border p-2 flex-1 rounded-l" (ngModelChange)="saveDraft()" placeholder="Type your message..." required>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600">Send</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit {
  conversationId!: string;
  messages = signal<{ content: string }[]>([]);
  draft = '';

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id')!;
    this.loadMessages();
    this.loadDraft();
  }

  loadMessages() {
    this.api.get<{ content: string }[]>(`/messages?conversationId=${this.conversationId}`)
      .subscribe(data => this.messages.set(data));
  }

  sendMessage() {
    if (this.draft.trim()) {
      const newMessage = { content: this.draft };
      this.api.post(`/messages`, { ...newMessage, conversationId: this.conversationId })
        .subscribe(() => {
          this.messages.update(msgs => [...msgs, newMessage]);
          this.draft = '';
          localStorage.removeItem(`draft_${this.conversationId}`);
        });
    }
    else{
      alert('Enter a message !!');
    }
  }

  saveDraft() {
    localStorage.setItem(`draft_${this.conversationId}`, this.draft);
  }

  loadDraft() {
    const saved = localStorage.getItem(`draft_${this.conversationId}`);
    if (saved) {
      this.draft = saved;
    }
  }
}
