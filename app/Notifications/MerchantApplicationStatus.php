<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\DatabaseMessage;

class MerchantApplicationStatus extends Notification
{
    use Queueable;

    public $status; // approved or rejected

    public function __construct($status)
    {
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return ['database', 'mail']; // Send via database and email
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Merchant Application Update')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Your merchant application has been ' . $this->status . '.')
            ->line('Thank you for using our platform!');
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Your merchant application has been ' . $this->status . '.',
            'status' => $this->status,
        ];
    }
}
