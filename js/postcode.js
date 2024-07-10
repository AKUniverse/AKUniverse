myFunction = function() {
    var input, filter, table, tr, td, i, txtValue, index, matchFound;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    
    // Check that the input contains only 1 or 2 alphabetic characters or 'ne6'
    if (!/^(?:[a-zA-Z]{1,2}|NE6)$/.test(filter)) {
      input.value = filter.replace(/[^a-zA-Z]/g, '').substring(0, 2);
      filter = input.value.toUpperCase();
    }
    
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    matchFound = false; // flag to indicate if any rows matched the search filter
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        td.innerHTML = txtValue;
        if (filter.length === 1) {
          if (txtValue.substring(0, 2).toUpperCase() === filter) {
            td.innerHTML = "<mark>" + txtValue.substring(0, filter.length) + "</mark>" + txtValue.substring(filter.length);
            tr[i].style.display = "";
            matchFound = true;
          } else {
            tr[i].style.display = "none";
          }
        } else if (filter === "NE6") {
          if (txtValue.toUpperCase() === filter) {
            td.innerHTML = "<mark>" + txtValue + "</mark>";
            tr[i].style.display = "";
            matchFound = true;
          } else {
            tr[i].style.display = "none";
          }
        } else {
          index = txtValue.toUpperCase().indexOf(filter);
          if (index === 0) {
            td.innerHTML = "<mark>" + txtValue.substring(0, filter.length) + "</mark>" + txtValue.substring(filter.length);
            tr[i].style.display = "";
            matchFound = true;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
    
    // If no matches were found, show all rows
    if (!matchFound) {
      for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
      }
    }
  }
  
   // Add class to clicked row and remove class from other rows
   $("tbody").on("click", "tr", function(e) {
      $(this).addClass("selected").siblings(".selected").removeClass("selected");
    });

  

      // Copy text to clipboard
      $(document).ready(function() {
        $('td:nth-child(2)').on('click', function() {
          var $temp = $('<input>');
          $('body').append($temp);
          $temp.val($(this).text().trim()).select();
          document.execCommand('copy');
          $temp.remove();
        });
      });


            // Notification
      $(document).ready(function() {
        function notify(type, message) {
          const id = Math.random().toString(36).substr(2, 10);
          const n = `<div id="${id}" class="notification ${type}">${message}</div>`;
          $("#notification-area").append(n);
          const notification = $("#" + id);
          notification.css("pointer-events", "auto"); // Enable pointer events initially
    
          // Remove notification after a delay
          setTimeout(() => {
            notification.remove();
          }, 5000);
        }
    
        const rows = $("#myTable tr");
        rows.each(function() {
          $(this).on("click", function() {
            const td = $(this).find("td:eq(1)"); // Get the second column of the clicked row
            const value = td.text();
            notify("success", "Copied: " + value);
          });
        });
      });

      



