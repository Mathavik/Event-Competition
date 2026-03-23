<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Certificate</title>

    <style>
        @page {
            size: A4;
            margin: 0;
        }

        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        body {
            background: #f0f0f0;
        }

        /* ✅ A4 Perfect Size */
        .certificate {
            width: 210mm;
            height: 297mm;
            background: #ffffff;
            position: relative;
            box-sizing: border-box;
            padding: 40px;
            text-align: center;
            overflow: hidden;
            page-break-after: avoid;
        }

        /* ✅ OUTER BORDER */
        .outer-border {
            position: absolute;
            top: 10mm;
            left: 10mm;
            right: 10mm;
            bottom: 10mm;
            border: 4px solid #c9a646;
        }

        /* ✅ INNER BORDER */
        .inner-border {
            position: absolute;
            top: 15mm;
            left: 15mm;
            right: 15mm;
            bottom: 15mm;
            border: 1px solid #1a237e;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 90px;
            color: rgba(200, 160, 70, 0.08);
            font-weight: bold;
            z-index: 0;
        }

        .org-name {
            font-size: 30px;
            font-weight: bold;
            color: #1a237e;
            margin-top: 20px;
            z-index: 1;
            position: relative;
        }

        .org-sub {
            font-size: 14px;
            color: #777;
            margin-bottom: 25px;
            z-index: 1;
            position: relative;
        }

        .title {
            font-size: 42px;
            font-weight: bold;
            color: #1a237e;
            letter-spacing: 2px;
            margin: 20px 0 5px;
            z-index: 1;
            position: relative;
        }

        .subtitle {
            font-size: 14px;
            color: #777;
            margin-bottom: 35px;
            z-index: 1;
            position: relative;
        }

        p {
            font-size: 16px;
            color: #333;
            margin: 10px 0;
            z-index: 1;
            position: relative;
        }

        .name {
            font-size: 36px;
            font-weight: bold;
            color: #1a237e;
            border-bottom: 2px solid #c9a646;
            display: inline-block;
            padding: 8px 60px;
            margin: 25px 0;
            z-index: 1;
            position: relative;
        }

        .event {
            font-size: 22px;
            margin: 15px 0;
            color: #333;
            z-index: 1;
            position: relative;
        }

        .prize {
            font-size: 26px;
            color: #c9a646;
            font-weight: bold;
            margin-top: 40px;
            z-index: 1;
            position: relative;
        }

        .footer {
            position: absolute;
            bottom: 50px;
            left: 60px;
            right: 60px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            z-index: 1;
        }

        .sign-line {
            width: 150px;
            border-top: 1px solid #000;
            margin-bottom: 5px;
        }

        .seal {
            position: absolute;
            bottom: 90px;
            right: 70px;
            width: 70px;
            height: 70px;
            border: 2px double #c9a646;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #c9a646;
            transform: rotate(-15deg);
            z-index: 2;
        }

        /* ❌ prevent page break */
        * {
            page-break-inside: avoid;
        }
    </style>
</head>

<body>

<div class="certificate">

    <div class="outer-border"></div>
    <div class="inner-border"></div>

    <div class="watermark">CERTIFIED</div>

    <div class="org-name">Your Organization Name</div>
    <div class="org-sub">Excellence in Education & Events</div>

    <div class="title">CERTIFICATE</div>
    <div class="subtitle">OF ACHIEVEMENT</div>

    <p>This is to certify that</p>

    <div class="name">{{ $student->name }}</div>

    <p>has successfully achieved in</p>

    <div class="event">{{ $event->name }}</div>

    <div class="prize">{{ $prize }} PRIZE WINNER</div>

    <div class="footer">
        <div>
            <strong>Date:</strong>
            {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
        </div>

        <div>
            <div class="sign-line"></div>
            Authorized Signature
        </div>
    </div>

    <div class="seal">OFFICIAL</div>

</div>

</body>
</html>