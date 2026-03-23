<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Certificate</title>

    <style>
        @page { size: A4; margin: 0; }

        body {
            margin: 0;
            padding: 0;
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .certificate {
            width: 794px;
            height: 1123px;
            background: #fff;
            position: relative;
            box-sizing: border-box;
            padding: 50px;
            text-align: center;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        /* ✅ OUTER BORDER - 4px */
        .outer-border {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 4px solid #c9a646;
        }

        /* ✅ INNER BORDER */
        .inner-border {
            position: absolute;
            top: 30px;
            left: 30px;
            right: 30px;
            bottom: 30px;
            border: 1px solid #1a237e;
        }

        .org-name {
            font-size: 32px;
            font-weight: bold;
            color: #1a237e;
            margin-top: 20px;
            margin-bottom: 5px;
            position: relative;
            z-index: 1;
        }

        .org-sub {
            font-size: 14px;
            color: #999;
            margin-bottom: 30px;
            position: relative;
            z-index: 1;
        }

        .title {
            font-size: 44px;
            font-weight: bold;
            color: #1a237e;
            margin: 20px 0 5px 0;
            position: relative;
            z-index: 1;
            letter-spacing: 2px;
        }

        .subtitle {
            font-size: 16px;
            margin-bottom: 40px;
            position: relative;
            z-index: 1;
            color: #666;
        }

        .name {
            font-size: 40px;
            font-weight: bold;
            color: #1a237e;
            border-bottom: 2px solid #c9a646;
            display: inline-block;
            padding: 8px 60px;
            margin: 30px 0;
            position: relative;
            z-index: 1;
        }

        .event {
            font-size: 24px;
            margin: 15px 0;
            position: relative;
            z-index: 1;
            color: #333;
        }

        .prize {
            font-size: 28px;
            color: #c9a646;
            margin-top: 50px;
            margin-bottom: 20px;
            font-weight: bold;
            position: relative;
            z-index: 1;
            letter-spacing: 1px;
        }

        .footer {
            position: absolute;
            bottom: 60px;
            left: 80px;
            right: 80px;
            display: flex;
            justify-content: space-between;
            z-index: 1;
            font-size: 14px;
        }

        .sign-line {
            width: 150px;
            border-top: 1px solid #000;
            margin-bottom: 8px;
        }

        .seal {
            position: absolute;
            bottom: 100px;
            right: 80px;
            width: 80px;
            height: 80px;
            border: 2px double #c9a646;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            color: #c9a646;
            transform: rotate(-15deg);
            z-index: 2;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 100px;
            color: rgba(200, 160, 70, 0.08);
            z-index: 0;
            font-weight: bold;
        }
        
        p {
            position: relative;
            z-index: 1;
            color: #333;
            margin: 15px 0;
            font-size: 16px;
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
            <strong>Date:</strong> {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
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