<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<style>
@page { size: A4 landscape; margin: 0; }

body {
    margin: 0;
    padding: 0;
}

.container {
    position: relative;
    width: 297mm;
    height: 210mm;
    font-family: 'Arial', sans-serif;
}

/* Background */
.bg {
    position: absolute;
    width: 100%;
    height: 100%;
}

/* Common Text */
.text {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #000;
}

/* Title */
.title {
    top: 30mm;
    font-size: 45px;
    font-weight: bold;
    letter-spacing: 5px;
}

/* Subtitle */
.subtitle {
    top: 50mm;
    font-size: 18px;
    letter-spacing: 3px;
}

/* Presented text */
.presented {
    top: 70mm;
    font-size: 20px;
}

/* Name */
.name {
    top: 85mm;
    font-size: 40px;
    font-weight: bold;
}

/* Description */
.desc {
    top: 110mm;
    font-size: 18px;
    width: 70%;
    left: 15%;
    line-height: 1.5;
}

/* Prize */
.prize {
    top: 140mm;
    font-size: 24px;
    font-weight: bold;
}

/* Footer */
.date {
    position: absolute;
    bottom: 25mm;
    left: 40mm;
    font-size: 16px;
}

.sign {
    position: absolute;
    bottom: 25mm;
    right: 40mm;
    font-size: 16px;
}
</style>
</head>

<body>

<div class="container">

    <!-- Background -->
    <img src="{{ public_path('certificate.jpg') }}" class="bg">

    <!-- Content -->
    <div class="text title">CERTIFICATE</div>

    <div class="text subtitle">OF ACHIEVEMENT</div>

    <div class="text presented">
        Proudly Presented To
    </div>

    <div class="text name">
        {{ $student->name }}
    </div>

    <div class="text desc">
        In recognition of outstanding performance and successful participation in 
        <b>{{ $event->name }}</b>. 
        Your dedication and effort are truly appreciated and celebrated.
    </div>

    <div class="text prize">
        🏆 {{ $prize }} PRIZE
    </div>

    <div class="date">
        Date: {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
    </div>

    <div class="sign">
        Signature
    </div>

</div>

</body>
</html>