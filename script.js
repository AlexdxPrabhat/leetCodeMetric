document.addEventListener("DOMContentLoaded", function () {

    const userNameInput = document.getElementById('userNameEnterd');
    const button = document.getElementById('buttonSearch'); // ✅ Variable should start with lowercase

    // Fixed querySelectors with proper ID or class notation
    const easyPieChart = document.querySelector('.easyQuestions'); 
    const mediumPieChart = document.querySelector('.mediumQuestions');
    const hardPieChart = document.querySelector('.hardQuestions');

    const totalSubmission = document.querySelector('.totalSubmission');
    const acceptanceRate = document.querySelector('.acceptanceRate');
    const contributionPoints = document.querySelector('.contributionPoints');
    const additionalInfo = document.querySelectorAll('.Card');
    

     function resetUI() {
        
        easyPieChart.innerHTML = "<p>Easy</p>";
        mediumPieChart.innerHTML = "<p>Medium</p>";
        hardPieChart.innerHTML = "<p>Hard</p>";

        totalSubmission.innerHTML = "";
        acceptanceRate.innerHTML = "";
        contributionPoints.innerHTML = "";
         
        additionalInfo.forEach(card => {
            card.style.display = "none"; 
        });

        console.log("UI Reset Done ✅");
    }


    function displayUserData(userData) {
        let totalEasySolvedPercent = (userData.easySolved / userData.totalEasy) * 100;
        let totalMediumSolvedPercent =(userData.mediumSolved/userData.totalMedium)*100;
        let totalHardSolvedPercent =(userData.hardSolved/userData.totalHard)*100;

        console.log(totalEasySolvedPercent);
        console.log(totalMediumSolvedPercent);
        console.log(totalHardSolvedPercent);
        easyPieChart.style.setProperty("--colorPercentage", `${totalEasySolvedPercent}%`);
        mediumPieChart.style.setProperty("--colorPercentage", `${totalMediumSolvedPercent}%`);
        hardPieChart.style.setProperty("--colorPercentage", `${totalHardSolvedPercent}%`);
        easyPieChart.insertAdjacentHTML("afterBegin", `<p>${userData.easySolved} / ${userData.totalEasy}</p>`)
        mediumPieChart.insertAdjacentHTML("afterBegin",`<p>${userData.mediumSolved}/ ${userData.totalEasy}</p>`)
        hardPieChart.insertAdjacentHTML("afterBegin", `<p>${userData.hardSolved} / ${userData.totalEasy}</p>`)
        

        let newElement1 = document.createElement("p");
        newElement1.textContent = `Total Submitted=> ${userData.totalSolved}`
        let newElement2 = document.createElement("p");
        newElement2.textContent = `Acceptance Rate=> ${userData.acceptanceRate}`
        let newElement3 = document.createElement("p");
        newElement3.textContent = `Contribution Points => ${userData.contributionPoints}`
        totalSubmission.appendChild(newElement1);
        acceptanceRate.appendChild(newElement2);
        contributionPoints.appendChild(newElement3);
        


    }

    async function findData(username) {
        let userFound = false;    
        try {
            button.textContent = 'Searching...';
            button.style.backgroundColor = 'gray';

            resetUI();

            const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.status);
            }
            else {  
                const data = await response.json();
                console.log(data);
                
                  if (data.status === "success") {
                    displayUserData(data);
                    userFound = true; // Mark as found if data is valid
                } else {
                    alert("❌ User does not exist!");
                }               
            }

        } catch (error) {
            console.log(Message.error)
        }
        finally {
            const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            const response = await fetch(url);
            let data2 = await response.json();

            button.textContent = 'Search';
            button.style.backgroundColor = 'blue';
            
            if (userFound) {
                additionalInfo.forEach(card => {
                    card.style.display = "block";
                });
            }
        };
    }
    function isValidUsername(name) {
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/;
            return usernameRegex.test(name);
    };
    button.addEventListener('click', function () {
        let userName = userNameInput.value.trim();

        if(!userName) {
            alert("❌ Enter User Name");
            return;
        }
        console.log(isValidUsername(userName));
        if (isValidUsername(userName)) {
            findData(userName);
        }
        else {
            alert("❌ Enter Correct Username (3-16 chars, must start with a letter)");
        }
    });
});
