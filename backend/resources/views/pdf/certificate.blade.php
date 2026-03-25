<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>
body {
    font-family: DejaVu Sans, sans-serif;
}

/* MAIN */
.certificate {
    width: 100%;
    border: 10px solid #1a237e;
    padding: 20px;
}

/* INNER */
.inner {
    border: 2px solid #c9a646;
    padding: 30px;
    text-align: center;
}

/* TEXT */
.title {
    font-size: 40px;
    font-weight: bold;
    color: #1a237e;
}

.subtitle {
    font-size: 16px;
    color: #c9a646;
    margin-bottom: 20px;
}

.name {
    font-size: 36px;
    font-weight: bold;
    margin: 20px 0;
    border-bottom: 2px solid #c9a646;
    display: inline-block;
    padding: 5px 20px;
}

.event {
    margin: 15px 0;
}

.prize {
    margin: 20px 0;
    font-size: 22px;
    font-weight: bold;
}

/* TABLE footer (IMPORTANT instead of flex) */
.footer {
    width: 100%;
    margin-top: 40px;
}

.footer td {
    width: 50%;
    font-size: 14px;
}

.signature-line {
    border-top: 1px solid black;
    width: 150px;
    margin-top: 30px;
}

</style>

</head>

<body>

<table class="certificate" cellpadding="0" cellspacing="0">
<tr>
<td>

    <div class="inner">

        <div class="title">CERTIFICATE</div>
        <div class="subtitle">OF EXCELLENCE</div>

        <p>This award is proudly presented to</p>

        <div class="name">
            {{ strtoupper($student->name ?? 'MATHAVI') }}
        </div>

        <p class="event">
            For outstanding achievement in <br>
            <b>{{ $event->name ?? 'SQUASH CHAMPIONSHIP' }}</b>
        </p>

        <div class="prize">
            {{ strtoupper($prize ?? 'FIRST') }} PRIZE
        </div>

        <table class="footer">
            <tr>
                <td align="left">
                    Date:<br>
                    {{ isset($event->event_date) ? \Carbon\Carbon::parse($event->event_date)->format('d F Y') : '10 April 2026' }}
                </td>

                <td align="right">
                    <!-- <div class="signature-line"></div> -->
                    Authorized Signature
                </td>
            </tr>
        </table>

    </div>

</td>
</tr>
</table>

</body>
</html>