import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from '@ionic/angular';
import { MessageItem, MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton],
})
export class ContactoPage implements OnInit {
  correo = '';
  mensaje = '';
  enviado = false;
  ultimoMensaje: MessageItem | null = null;

  constructor(private readonly messagesService: MessagesService) {}

  async ngOnInit() {
    this.ultimoMensaje = await this.messagesService.getLastMessage();

    if (this.ultimoMensaje) {
      this.correo = this.ultimoMensaje.correo;
      this.mensaje = this.ultimoMensaje.mensaje;
    }
  }

  async enviar() {
    if (!this.correo || !this.mensaje) {
      return;
    }

    await this.messagesService.saveMessage(this.correo, this.mensaje);
    this.ultimoMensaje = {
      correo: this.correo,
      mensaje: this.mensaje,
    };
    this.enviado = true;
  }
}
