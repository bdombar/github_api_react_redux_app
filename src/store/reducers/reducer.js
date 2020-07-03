/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
const initState = {
    searchTerm: '',
    dataList: [],
    userData: [],
    dataRetrieved: false,
    userClicked: false,
    error: false
};

const reducer = (state = initState, action) => {

    switch (action.type) {
        case 'CHANGE':
            let currentUsername = action.e.target.value;
            return {
                ...state,
                searchTerm: currentUsername
            };

        case 'SUBMIT':
            const Chart = require('chart.js');
            Chart.platform.disableCSSInjection = true;
            const ctx = document.getElementById('myChart');
            let arrFollowers = [];
            let arrUsernames = [];
            let arrList = [];
            if (action.data.total_count !== 0) {
                for (let i = 0; i < (action.data.items.length - 10); i++) {
                    arrFollowers.push(action.data.items[i].followers_url.length);
                    arrUsernames.push(action.data.items[i].login);
                }

                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: arrUsernames,
                        datasets: [{
                            label: 'followers',
                            data: arrFollowers,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                for (let j = 0; j < action.data.items.length; j++) {
                    let element = action.data.items[j];
                    arrList.push({
                        username: element.login,
                        id: element.id,
                        avatar: element.avatar_url,
                        repos: element.repos_url,
                        url: element.url
                    })
                }
                return {
                    ...state,
                    dataList: arrList,
                    dataRetrieved: true,
                    error: false
                }
            } else {
                console.log('User not found');
                return {
                    ...state,
                    error: true
                }
            }
        case 'CLICKED':
            let arrUser = [];
            arrUser.push({
                username: action.data.login,
                id: action.data.id,
                avatar: action.data.avatar_url,
                followers: action.data.followers,
                repos: action.data.public_repos,
                url: action.data.html_url
            })
            return {
                ...state,
                dataList: [],
                userData: arrUser,
                userClicked: true
            }
    }

    /* if (action.type === 'CHANGE') {
        let currentUsername = action.e.target.value;
        return {
            ...state,
            searchTerm: currentUsername
        }
    }

    if (action.type === 'SUBMIT') {
        console.log('reducer called for submit');
        let arr = []
        if (action.data.total_count !== 0) {
            for (let index = 0; index < action.data.items.length; index++) {
                let element = action.data.items[index];
                arr.push({
                    username: element.login,
                    id: element.id,
                    avatar: element.avatar_url,
                    repos: element.repos_url,
                    url: element.url
                })
            }
            return {
                ...state,
                dataList: arr,
                dataRetrieved: true
            }
        }

        if (action.type === 'CLICKED') {
            console.log('reducer called for clicked');
            let arr = [];
            arr.push({
                username: action.data.login,
                id: action.data.is,
                avatar: action.data.avatar_url,
                followers: action.data.followers
            })
            return {
                ...state,
                dataList: [],
                userData: arr,
                userClicked: true
            }
        } else {
            console.log('User not found');
            return {
                ...state,
                error: true
            }
        }
    } */
    return state;
};

export default reducer;
