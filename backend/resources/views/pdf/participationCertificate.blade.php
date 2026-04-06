<!DOCTYPE html>
<html>
<head>
    <title>Certificate</title>
    <style>
        /* PDF download landscape-la irukka idhu romba mukkiyam */
        @page { 
            size: A4 landscape; 
            margin: 0; 
        }

        body { 
            text-align: center; 
            font-family: 'Arial', sans-serif; 
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .cert { 
            border: 10px double #333; 
            padding: 50px; 
            margin: 20px auto; 
            width: 800px; /* Landscape width */
            height: 500px; /* Landscape height */
            background-color: white;
            position: relative;
            page-break-after: always; /* Ovvoru certificate-um puthu page-la varum */
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
        }

        h2 { font-size: 40px; color: #2c3e50; }
        h3 { font-size: 30px; color: #e67e22; border-bottom: 2px solid #eee; display: inline-block; padding-bottom: 10px; }
        p { font-size: 20px; font-style: italic; }
    </style>
</head>
<body>

@foreach($students as $student)
<div class="cert">
    <h2>Participation Certificate</h2>
    <p>This certifies that</p>
    <h3>{{ $student->student_name }}</h3>
    <p>has participated in</p>
    <h3>{{ $student->event_name }}</h3>
</div>
@endforeach

</body>
</html>