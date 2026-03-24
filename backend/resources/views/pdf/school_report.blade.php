<!DOCTYPE html>
<html>
<head>
    <title>School Report</title>
    <style>
        body { font-family: Arial; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #f2f2f2; }
    </style>
</head>
<body>

<h2 style="text-align:center;">School Wise Report</h2>

<table>
    <tr>
        <th>School Name</th>
        <th>Total Students</th>
        <th>Total Events</th>
    </tr>

    @foreach($data as $row)
    <tr>
        <td>{{ $row->school_name }}</td>
        <td>{{ $row->total_students }}</td>
        <td>{{ $row->total_events }}</td>
    </tr>
    @endforeach
</table>

</body>
</html>