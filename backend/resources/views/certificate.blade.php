<!DOCTYPE html>
<html lang="ta">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Sport</title>
    <!-- கூகுள் எழுத்துருக்கள் -->
    <link href="https://fonts.googleapis.com" rel="stylesheet">
    <style>
        /* A4 அளவு மற்றும் பொதுவான அமைப்புகள் */
        @page {
            size: A4;
            margin: 0;
        }

        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* முதன்மை கண்டெய்னர் */
        .certificate-container {
            width: 210mm;
            height: 297mm;
            background: #fff;
            position: relative;
            overflow: hidden;
            border: 12px solid #1a3a6c; /* தடிமனான நீல பார்டர் */
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }

        /* நான்கு பக்க மெல்லிய உள் பார்டர் */
        .inner-frame {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 1px solid #1a3a6c;
            pointer-events: none;
        }

        /* மூலைகளில் உள்ள டிசைன்கள் (Shapes) */
        .shape-top-left {
            position: absolute;
            top: -40px;
            left: -40px;
            width: 180px;
            height: 180px;
            background: #1a3a6c;
            border-radius: 50%;
            z-index: 1;
        }

        .shape-bottom-right {
            position: absolute;
            bottom: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: #1a3a6c;
            border-radius: 50%;
            z-index: 1;
        }

        /* உள்ளடக்கங்கள் */
        .content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 100px 50px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* தலைப்பு பகுதி */
        .title-group {
            margin-top: 40px;
        }

        .main-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 58px;
            font-weight: 800;
            color: #1a3a6c;
            letter-spacing: 5px;
            margin: 0;
            text-transform: uppercase;
        }

        .sub-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #333;
            letter-spacing: 8px;
            margin: 0;
            text-transform: uppercase;
        }

        /* சான்றிதழ் விவரங்கள் */
        .presented-text {
            font-family: 'Poppins', sans-serif;
            font-size: 20px;
            color: #666;
            margin-top: 80px;
            font-weight: 400;
        }

        .recipient-name {
            font-family: 'Playball', cursive;
            font-size: 75px;
            color: #1a3a6c;
            margin: 20px 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #ddd;
            min-width: 500px;
        }

        .description {
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            line-height: 1.8;
            color: #444;
            max-width: 600px;
            margin: 40px auto;
        }

        /* கோல்டன் சீல் (Seal) */
        .seal-wrapper {
            margin: 30px 0;
        }

        .gold-seal {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: #fff;
            border: 4px solid #d4af37;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }

        .gold-seal::after {
            content: '';
            position: absolute;
            width: 110px;
            height: 110px;
            border: 2px solid #d4af37;
            border-radius: 50%;
        }

        .seal-content {
            font-family: 'Montserrat', sans-serif;
            color: #d4af37;
            font-weight: 800;
            text-align: center;
            font-size: 14px;
            z-index: 2;
        }

        /* கீழே உள்ள கையொப்பப் பகுதி */
        .footer-section {
            position: absolute;
            bottom: 100px;
            width: 80%;
            display: flex;
            justify-content: space-between;
        }

        .sig-box {
            width: 200px;
            text-align: center;
        }

        .sig-line {
            border-top: 1.5px solid #333;
            margin-bottom: 10px;
        }

        .sig-label {
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 700;
            color: #333;
            text-transform: uppercase;
        }
    </style>
</head>
<body>

    <div class="certificate-container">
        <!-- பார்டர்கள் மற்றும் டிசைன்கள் -->
        <div class="inner-frame"></div>
        <div class="shape-top-left"></div>
        <div class="shape-bottom-right"></div>

        <div class="content">
            <div class="title-group">
                <h1 class="main-title">Certificate</h1>
                <p class="sub-title">of Sport</p>
            </div>

            <p class="presented-text">This Certificate is Proudly Presented To</p>

            <div class="recipient-name">Sara Bellum</div>

            <p class="description">
                This sports certificate is a testament to your skill, hard work, and passion for sports. 
                May it be a source of pride and motivation for you as you continue to excel.
            </p>

            <!-- கோல்டன் சீல் -->
            <div class="seal-wrapper">
                <div class="gold-seal">
                    <div class="seal-content">
                        OFFICIAL<br>AWARD<br>2026
                    </div>
                </div>
            </div>

            <!-- கையொப்பம் மற்றும் தேதி -->
            <div class="footer-section">
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <span class="sig-label">DATE</span>
                </div>
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <span class="sig-label">SIGNATURE</span>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
