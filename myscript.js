
// Represents data that would come in from database
var reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	}
};

function makeRows(sectionLength , rowLength , placement){

    const rows = ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" , "i" , "j" , "k" , "l" , "m" , "n"
                , "o" , "p" , "q" , "r" , "s" , "t"] 

    let html = "" ;
    let counter =1 ;

    rows.forEach(row =>{

        switch(placement){

            //make label
            case "left" : html += `<div class = "label">${row}</div>` ;
                    break ;
            // add 12 to counter 
            case "right" : counter += (rowLength - sectionLength) ;
                    break ;
            // 
            default: counter += (rowLength - sectionLength)/2 ;
        }


        // loop in here

        for(let i = 0 ; i < sectionLength ; i++){
            html += `<div class = "a" id = ${row + counter}>${counter}</div>` ;
            counter++ ;
        }



        switch(placement){
            //Add 12 to counter
            case "left" : counter += (rowLength - sectionLength) ;
                    break ;
            // Add the label
            case "right" : html += `<div class = "label">${row}</div>` ;
                    break ;
            //add 3 to counter
            default:  counter += (rowLength - sectionLength)/2 ;
        }
    }) ;

    document.getElementById(placement).innerHTML = html  ;
}

makeRows(3,15,"left") ;
makeRows(3,15, "right") ;
makeRows(9,15,"middle") ;


(function(){
    "use strict"
    
    for(const key in reservedSeats){

        // For best practices to prevent object from using methods inhereted from another object
        // Dealing with Prototypical Inheritance
        if(reservedSeats.hasOwnProperty(key)){
            const obj = reservedSeats[key] ;
        
            document.getElementById(obj.seat).className = "r" ;
            document.getElementById(obj.seat).innerHTML = "R" ; 
        }
    }
}()) ;

(function(){

    "use strict" 

    let selectSeats = [] ;

    var seats = document.querySelectorAll('.a') ;

    seats.forEach(function(seat){

        seat.addEventListener("click" , function(){


            // get id of the seat 
            // run function that adds it to the array

            seatSelectionProcess(seat.id) ;

        })
    }) ;

    function seatSelectionProcess(thisSeat){


        if(!document.getElementById(thisSeat).classList.contains('r')){

            var index = selectSeats.indexOf(thisSeat) ;

            if(index > -1){

                // Take seat out of the array and change class to "a"
    
                selectSeats.splice(index , 1) ;
    
                document.getElementById(thisSeat).className = "a" ;
    
    
    
            }else{
    
                // Add seat to the array and change the class to "s" 
    
                selectSeats.push(thisSeat) ;
    
                document.getElementById(thisSeat).className = "s" ;
    
            }
        }

        manageConfirmForm() ;
    }

    document.getElementById("reserve").addEventListener("click" , (event)=> {

        document.getElementById("resform").style.display = "block" ;
        event.preventDefault() ;

    }) ;

    document.getElementById("cancel").addEventListener("click" , (event) => {

        document.getElementById("resform").style.display = "none" ;
        event.preventDefault() ;
    })

    function manageConfirmForm(){

        if(selectSeats.length > 0){
            document.getElementById("confirmres").style.display = "block" ;

            if(selectSeats.length === 1){
                document.getElementById("selectedseats").innerHTML = `You have selected seat ${selectSeats[0]}`

            }else{
                let seatsString = selectSeats.toString() ;
                seatsString = seatsString.replace(/,/g , ", ") ;
                seatsString = seatsString.replace(/,(?=[^,]*$)/ , ' and') ;
                document.getElementById("selectedseats").innerHTML = `You have selected seats ${seatsString}` ;
            }

        }else{
            document.getElementById("confirmres").style.display = "none" ;
            document.getElementById("selectedseats").innerHTML = "You need to select some seats to reserve.<br> <a href = '#' id = 'error'> Close </a> this doalog box pick at least one seat" ;
            
            document.getElementById('error').addEventListener("click" , function(){
                document.getElementById('resform').style.display = "none" ;
            })

        }
    }

    manageConfirmForm() ;

    document.getElementById('confirmres').addEventListener('submit' , function(event){
        event.preventDefault() ;
        processReservation() ;

    })

    function processReservation(){
        const hardCodeRecords = Object.keys(reservedSeats).length ;
        const fname = document.getElementById('fname').value ;
        const lname = document.getElementById('lname').value ;
        let counter = 1;
        let nextRecord = '' ;

        selectSeats.forEach(function(thisSeat){

            // Sets class name to "r"
            document.getElementById(thisSeat).className = 'r' ;
            // sets the innerHTML for that seat <div> to "R"
            document.getElementById(thisSeat).innerHTML = 'R' ;
            // add each record to the reservedSeats object

            nextRecord = `record${hardCodeRecords + counter}` ;

            reservedSeats[nextRecord] = {
                seat: thisSeat,
                owner: {
                    fname : fname ,
                    lname : lname 
                }
            }
            
            counter++ ;


        })

        // Clean up...

        document.getElementById('resform').style.display = "none" ;
        selectSeats = [] ;
        manageConfirmForm() ;

        console.log(reservedSeats) ;
    }



}())




