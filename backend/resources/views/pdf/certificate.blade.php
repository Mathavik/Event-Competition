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

/* Container */
.container {
    position: relative;
    width: 297mm;
    height: 210mm;
    font-family: 'Georgia', 'Times New Roman', serif;
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
    color: #222;
}

/* Title */
.title {
    top: 25mm;
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 6px;
}

/* Subtitle */
.subtitle {
    top: 45mm;
    font-size: 20px;
    letter-spacing: 4px;
    color: #555;
}

/* Presented text */
.presented {
    top: 70mm;
    font-size: 24px;
}



@font-face {
    font-family: 'GreatVibes';
    src: url('{{ public_path("fonts/GreatVibes-Regular.ttf") }}') format('truetype');
}

/* Name */
.name {
    top: 85mm;
    font-size: 52px;
    font-weight: bold;
    color: #b8860b;
    letter-spacing: 3px;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;
}

/* Description */
.desc {
    top: 105mm;
    font-size:22px;
    width: 65%;
    left: 17.5%;
    line-height: 1.6;
}

/* Prize */
.prize {
    top: 150mm;
    font-size: 26px;
    font-weight: bold;
    color: #b8860b;
    letter-spacing: 2px;
}

/* Footer */
.date {
    position: absolute;
    bottom: 20mm;
    left: 40mm;
    font-size: 22px;
}

.sign {
    position: absolute;
    bottom: 20mm;
    right: 40mm;
    font-size: 22px;
}
</style>

</head>

<body>

<div class="container">

    <!-- Background Image -->
    <img src="{{ public_path('certificate1.jpg') }}" class="bg">



  

    <!-- Presented -->
    <div class="text presented">
        Proudly Presented To
    </div>

    <!-- Name -->
    <div class="text name">
        {{ strtoupper($student->name) }}
    </div>

    <!-- Description -->
    <div class="text desc">
    This certificate is proudly awarded to <b>{{ strtoupper($student->name) }}</b> 
    in recognition of outstanding performance and successful participation in 
    <b>{{ $event->name }}</b>.  
    Your dedication, commitment, and excellence have set a remarkable example.  
    We truly appreciate your hard work and wish you continued success in all your future endeavors.
</div>

    <!-- Prize (No ? issue) -->
    @if(!empty($prize))
    <div class="text prize">
        {{ strtoupper($prize) }} PRIZE
    </div>
    @endif

    <!-- Date -->
    <div class="date">
        Date: {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
    </div>

    <!-- Signature -->
   <div class="sign">
    <img src="{{ public_path('signature.jpg') }}" style="height:40px;"><br>
    Signature
</div>

</div>

</body>
</html>