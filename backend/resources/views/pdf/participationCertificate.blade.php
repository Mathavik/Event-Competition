<!DOCTYPE html>
<html>
<head>
    <title>Participation Certificates</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Georgia', 'Times New Roman', serif;
        }

        .certificate {
            position: relative;
            width: 297mm;
            height: 210mm;
            overflow: hidden;
            page-break-after: always;
            color: #222;
        }

        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .content {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
        }

        .logo {
            position: absolute;
            top: 10mm;
            left: 10mm;
            height: 25mm;
            z-index: 3;
        }

        .title {
            position: absolute;
            top: 62mm;
            width: 100%;
            text-align: center;
            font-size: 28px;
            letter-spacing: 2px;
            z-index: 3;
        }

        .name {
            position: absolute;
            top: 82mm;
            width: 100%;
            text-align: center;
            font-size: 44px;
            font-weight: bold;
            color: #b8860b;
            letter-spacing: 2px;
            text-transform: uppercase;
            z-index: 3;
        }

        .description {
            position: absolute;
            top: 105mm;
            width: 68%;
            left: 16%;
            font-size: 18px;
            line-height: 1.6;
            text-align: center;
            z-index: 3;
        }

        .event-name {
            position: absolute;
            top: 128mm;
            width: 100%;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #2d3748;
            z-index: 3;
        }

        .date {
            position: absolute;
            bottom: 20mm;
            left: 30mm;
            font-size: 18px;
            z-index: 3;
        }

        .sign-left,
        .sign-right {
            position: absolute;
            bottom: 20mm;
            text-align: center;
            font-size: 16px;
            z-index: 3;
        }

        .sign-left {
            left: 45mm;
        }

        .sign-right {
            right: 45mm;
        }

        .sign-image {
            height: 20mm;
            display: block;
            margin: 0 auto 4px;
        }
    </style>
</head>
<body>

@php
    $setting = \App\Models\CertificateSetting::first();
    $bg = $setting->background_image ?? null;
    $logo = $setting->logo ?? null;
    $coord = $setting->coordinator_signature ?? null;
    $principal = $setting->principal_signature ?? null;

    $inlineImageSrc = function ($path) {
        if (!$path) {
            return null;
        }

        $fullPath = storage_path('app/public/' . $path);
        if (!file_exists($fullPath)) {
            return null;
        }

        $type = pathinfo($fullPath, PATHINFO_EXTENSION);
        $data = base64_encode(file_get_contents($fullPath));
        return 'data:image/' . $type . ';base64,' . $data;
    };

    $bgSrc = $inlineImageSrc($bg);
    $logoSrc = $inlineImageSrc($logo);
    $coordSrc = $inlineImageSrc($coord);
    $principalSrc = $inlineImageSrc($principal);
@endphp

@foreach($students as $student)
    <div class="certificate">
        @if($bgSrc)
            <img src="{{ $bgSrc }}" class="background">
        @endif

        <div class="content">
            @if($logoSrc)
                <img src="{{ $logoSrc }}" class="logo">
            @endif

            <div class="title">Participation Certificate</div>

            <div class="name">{{ strtoupper($student->student_name) }}</div>

            <div class="description">
                This certificate is proudly awarded to <strong>{{ strtoupper($student->student_name) }}</strong>
                for participating in the event <strong>{{ $student->event_name }}</strong>.
                Your dedication and participation are highly appreciated.
            </div>

            <div class="event-name">{{ $student->event_name }}</div>

            <div class="date">
                Date: {{ \Carbon\Carbon::parse($student->event_date)->format('d-m-Y') }}
            </div>

            @if($coordSrc)
                <div class="sign-left">
                    <img src="{{ $coordSrc }}" class="sign-image">
                    Coordinator
                </div>
            @endif

            @if($principalSrc)
                <div class="sign-right">
                    <img src="{{ $principalSrc }}" class="sign-image">
                    Principal
                </div>
            @endif
        </div>
    </div>
@endforeach

</body>
</html>