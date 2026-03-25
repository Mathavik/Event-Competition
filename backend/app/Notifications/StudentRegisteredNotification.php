<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
// app/Notifications/StudentRegisteredNotification.php

use Illuminate\Notifications\Messages\DatabaseMessage;

class StudentRegisteredNotification extends Notification
{
    protected $student;

    public function __construct($student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' =>   $this->student->name . ' has registered for an event.',
            'student_id' => $this->student->id
        ];
    }
}