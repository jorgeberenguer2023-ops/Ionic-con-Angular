import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface MessageItem {
  correo: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly key = 'ultimoMensaje';

  async saveMessage(correo: string, mensaje: string): Promise<void> {
    await Preferences.set({
      key: this.key,
      value: JSON.stringify({ correo, mensaje }),
    });
  }

  async getLastMessage(): Promise<MessageItem | null> {
    const result = await Preferences.get({ key: this.key });
    if (!result.value) {
      return null;
    }

    return JSON.parse(result.value) as MessageItem;
  }
}
