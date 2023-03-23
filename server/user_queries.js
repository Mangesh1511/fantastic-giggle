
exports.prev_contest_details = `
query($username: String!) {
    

}`

exports.lastsubmissions = `
query ($username: String!, $limit: Int) {
    recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}
`;

exports.userdetails = `
query($username:String!)
{
    matchedUser(username: $username) {
        username
        
        profile {
            realName
            websites
            countryName
            skillTags
            company
            school
            starRating
            aboutMe
            userAvatar
            reputation
            ranking
        }
    
            submitStats: submitStatsGlobal {
            acSubmissionNum {
            difficulty
            count
            submissions
            }
            }
            
    }
    userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
            title
            startTime
        }
    }

    
}
`

exports.SubmissionStatus=  `
{
    data:
    {
        question:
        {
            questionId:2294,
            note:""
        }
    }
}`