<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Certificate</title>

<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Allura&family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400&display=swap" rel="stylesheet">

<style>
@page { size: A4; margin: 0; }

html, body {
    margin: 0;
    padding: 0;
}

/* 🔥 Base */
.certificate {
    width: 210mm;
    height: 297mm;
    position: relative;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #ffffff, #e3f2fd, #fff8e1);
    overflow: hidden;
}

/* 🔥 Color Glow */
.certificate::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top left, rgba(255,152,0,0.2), transparent),
                radial-gradient(circle at bottom right, rgba(26,35,126,0.2), transparent);
}

/* 🔥 Borders */
.outer-border {
    position: absolute;
    top: 5mm; left: 5mm; right: 5mm; bottom: 5mm;
    border: 6px double #c9a646;
}

.inner-border {
    position: absolute;
    top: 12mm; left: 12mm; right: 12mm; bottom: 12mm;
    border: 2px solid #1a237e;
}

/* 🔥 Top + Bottom Design */
.top-design, .bottom-design {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 6px;
    background: linear-gradient(to right, #ff9800, #c9a646, #1a237e);
}

.top-design { top: 10mm; }
.bottom-design { bottom: 10mm; }

/* 🔥 Corners */
.corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 3px solid #c9a646;
}
.top-left { top: 12mm; left: 12mm; border-right: none; border-bottom: none; }
.top-right { top: 12mm; right: 12mm; border-left: none; border-bottom: none; }
.bottom-left { bottom: 12mm; left: 12mm; border-right: none; border-top: none; }
.bottom-right { bottom: 12mm; right: 12mm; border-left: none; border-top: none; }

/* 🔥 Watermark */
.watermark {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-30deg);
    font-size: 120px;
    color: rgba(200,160,70,0.07);
}

/* 🔥 Content */
.content {
    position: absolute;
    top: 40mm;
    left: 20mm;
    right: 20mm;
    bottom: 25mm;
    text-align: center;
}

/* 🔥 Org */
.org-name {
    font-size: 36px;
    font-family: 'Playfair Display', serif;
    color: #1a237e;
    font-weight: bold;
}

.org-sub {
    font-size: 14px;
    color: #666;
}

/* 🔥 Title */
.title {
    font-family: 'Allura', cursive;
    font-size: 80px;
    background: linear-gradient(45deg, #ff9800, #c9a646, #1a237e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 🔥 Subtitle */
.subtitle {
    font-size: 18px;
    color: #1a237e;
    letter-spacing: 3px;
    font-weight: bold;
}

/* Divider */
.divider {
    width: 160px;
    height: 4px;
    background: linear-gradient(to right, #ff9800, #c9a646);
    margin: 20px auto;
}

/* 🔥 Name */
.name {
    font-family: 'Great Vibes', cursive;
    font-size: 70px;
    color: #c9a646;
    border-bottom: 3px solid #1a237e;
    padding: 10px 120px;
    display: inline-block;
    text-shadow: 2px 3px 6px rgba(0,0,0,0.3);
}

/* Event */
.event {
    font-size: 24px;
    margin-top: 10px;
    font-weight: bold;
    color: #1a237e;
}

/* 🔥 Prize */
.prize {
    margin-top: 25px;
    font-size: 26px;
    color: white;
    background: linear-gradient(45deg, #ff9800, #c9a646, #1a237e);
    padding: 14px 40px;
    border-radius: 40px;
    display: inline-block;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}

/* Description */
.description {
    font-size: 16px;
    padding: 0 50px;
    color: #444;
    line-height: 2;
}

/* Extra */
.extra-line {
    font-family: 'Allura', cursive;
    font-size: 30px;
    color: #ff9800;
    margin-top: 15px;
}

/* 🔥 Gold Seal */
.seal {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, #ffd700, #c9a646);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

/* Footer */
.footer {
    position: absolute;
    bottom: 20mm;
    left: 25mm;
    right: 25mm;
    display: flex;
    justify-content: space-between;
}

/* Signature */
.signature {
    font-family: 'Allura', cursive;
    font-size: 20px;
}

.sign-line {
    width: 200px;
    border-top: 2px solid #000;
}

/* Cert ID */
.cert-id {
    position: absolute;
    bottom: 10mm;
    right: 20mm;
    font-size: 12px;
}

</style>
</head>

<body>

<div class="certificate">

<div class="outer-border"></div>
<div class="inner-border"></div>

<div class="corner top-left"></div>
<div class="corner top-right"></div>
<div class="corner bottom-left"></div>
<div class="corner bottom-right"></div>

<div class="top-design"></div>
<div class="bottom-design"></div>

<div class="watermark">CERTIFIED</div>

<div class="content">

<div class="org-name">Your Organization Name</div>
<div class="org-sub">Excellence in Education & Events</div>

<div class="title">Certificate</div>
<div class="subtitle">OF ACHIEVEMENT</div>

<div class="divider"></div>

<p>This is to proudly certify that</p>

<div class="name">{{ $student->name }}</div>

<p>has successfully demonstrated outstanding performance in</p>

<div class="event">{{ $event->name }}</div>

<div class="prize">{{ $prize }} PRIZE WINNER</div>

<div class="description">
This certificate is awarded in recognition of exceptional dedication, creativity, and excellence.
</div>

<div class="extra-line">
With Best Wishes for Your Future ✨
</div>

</div>

<div class="seal"></div>

<div class="footer">
    <div>
        <strong>Date:</strong>
        {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
    </div>

    <div>
        <div class="sign-line"></div>
        <div class="signature">Authorized Signature</div>
    </div>
</div>



</div>

</body>
</html>