<h2 style="text-align:center;">{{ $event->name }} - School & Students</h2>

@foreach($data as $school => $students)
    <h3>{{ $school }}</h3>

    <table border="1" width="100%" cellspacing="0" cellpadding="5">
        <tr>
            <th>Student Name</th>
            <th>Email</th>
        </tr>

        @foreach($students as $student)
        <tr>
            <td>{{ $student->name }}</td>
            <td>{{ $student->email }}</td>
        </tr>
        @endforeach
    </table>
@endforeach