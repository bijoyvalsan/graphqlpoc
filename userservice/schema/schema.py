import graphene

class User(graphene.ObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    age = graphene.Int()
    dep_id = graphene.Int()

class Query(graphene.ObjectType):
    hello = graphene.String()
    single_user = graphene.Field(User)
    multiple_user = graphene.List(User)

    # resolvers

    def resolve_hello(self, info):
        return 'Hello world!'

    def resolve_single_user(self, info):
        one_user = User(first_name ="bijoy", last_name="valsan", age=33, dep_id=1)
        return one_user
    
    def resolve_multiple_user(self, info):
        one_user = User(first_name ="onefirst", last_name="onelast", age=34, dep_id=1)
        two_user = User(first_name ="twofirst", last_name="twolast", age=35, dep_id=1)
        three_user = User(first_name ="threefirst", last_name="threelast", age=36, dep_id=1)
        four_user = User(first_name ="fourfirst", last_name="fourlast", age=37, dep_id=2)
        list_data = []
        list_data.append(one_user)
        list_data.append(two_user)
        list_data.append(three_user)
        list_data.append(four_user)
        return list_data


schema = graphene.Schema(query=Query)
