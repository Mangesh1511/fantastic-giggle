const {GraphQLBoolean,GraphQLID,GraphQLObjectType,GraphQLInt,GraphQLList,GraphQLSchema,GraphQLNonNull,GraphQLString,}=require('graphql')

const Rootquery=new GraphQLObjectType({

    name:'Mangesh2344',
    fields:
    {
         matchedUser(username= "Mangesh2344") {
            username
            submitStats:submitStatsGlobal {
            acSubmissionNum {
            difficulty
            count
            submissions
            }
            }
            }
            
    }

})

module.exports=new GraphQLSchema({
    query:Rootquery,
})