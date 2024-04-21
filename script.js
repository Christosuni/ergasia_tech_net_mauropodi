function calculateBlanks() {
    // Ελέγχουμε αν όλα τα πεδία είναι συμπληρωμένα και είναι σωστά
    if (!document.getElementById('name').value.trim() ||
        !document.getElementById('email').value.trim() ||
        !document.getElementById('register-number').value.trim() ||
        isNaN(document.getElementById('register-number').value) ||
        (!document.getElementById('education').checked && !document.getElementById('advanced').checked) ||
        !document.getElementById('numBlanks').value.trim() ||
        !document.getElementById('title').value.trim() ||
        !document.getElementById('excerpt').value.trim()) {
        alert('Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία και βεβαιωθείτε ότι τα δεδομένα είναι σωστά.');
        return;
    }

    const title = document.getElementById('title').value.trim();
    const excerpt = document.getElementById('excerpt').value.trim();
    const numBlanks = parseInt(document.getElementById('numBlanks').value, 10);

    if (isNaN(numBlanks) || numBlanks < 0 || numBlanks > 10) {
        alert('Εισάγετε έναν έγκυρο αριθμό κενών από 0 έως 10.');
        return;
    }

    const words = excerpt.split(/\s+/);
    if (numBlanks > words.length) {
        alert('Τα κενά δεν μπορούν να είναι περισσότερα από τις λέξεις του αποσπάσματος.');
        return;
    }

    const blankIndices = new Set();
    while (blankIndices.size < numBlanks) {
        blankIndices.add(Math.floor(Math.random() * words.length));
    }

    blankIndices.forEach((index) => {
        words[index] = '_'.repeat(words[index].length);
    });

    document.getElementById('result').innerHTML = `<strong>Τίτλος:</strong> ${title}<br><strong>Απόσπασμα:</strong> ${words.join(' ')}`;
    document.getElementById('result').style.display = 'block';
}

function printForm() {
    const titleText = document.getElementById('title').value.trim();
    const excerptText = document.getElementById('excerpt').value.trim().split(/\s+/).join(' '); // Προσαρμογή του κειμένου
    const printContent = `
        <div>
            <h2 style="font-size: 24px; font-weight: bold;">${titleText}</h2> <!-- Μεγάλο και έντονο για τον τίτλο -->
            <p>${excerptText}</p> <!-- Κανονικό κείμενο για την παράγραφο -->
        </div>
    `;

    const printWindow = window.open('', '_blank', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>Εκτύπωση</title>
                <style>
                    body { font-family: Arial; }
                    @media print {
                        h2 { font-size: 24px; font-weight: bold; } /* Εντονα και μεγάλα γράμματα για τον τίτλο κατά την εκτύπωση */
                        p { font-size: 16px; } /* Στάνταρ μέγεθος για το κείμενο της παραγράφου */
                    }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);
    printWindow.document.close();

    setTimeout(function () {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }, 250);
}




document.getElementById('fill-blanks-form').onreset = function() {
    document.getElementById('result').style.display = 'none';
};
