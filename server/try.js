const url = "https://leetcode.com/graphql";
const body = {
    query: "\n    query userProblemsSolved($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username:$username) {\n    problemsSolvedBeatsStats {\n      difficulty\n      percentage\n    }\n    submitStatsGlobal {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n    ",
    variables: {
        username: "Mangesh2344",
        slug:'accepted',
    }
};
fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json",

    }
})
    .then(res => res.json())
    .then(data => { console.log(data) })








