
export class MailMessageDto {
  senderEmail: string;
  senderName: string;
  mailContent: string;


  constructor(senderEmail: string, senderName: string, mailContent: string) {
    this.senderEmail = senderEmail;
    this.senderName = senderName;
    this.mailContent = mailContent;
  }
}
