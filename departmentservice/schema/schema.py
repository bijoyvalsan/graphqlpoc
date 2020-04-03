import graphene

class Department(graphene.ObjectType):
    dep_id = graphene.Int()
    name = graphene.String()
    

class Query(graphene.ObjectType):
    hello = graphene.String()
    single_department = graphene.Field(Department)
    multiple_department = graphene.List(Department)
    dep_by_id = graphene.Field(Department, dep_id=graphene.Int())

    # resolvers

    def resolve_hello(self, info):
        return 'Hello world from department'

    def resolve_single_department(self, info):
        one_department = Department(dep_id =1, name="dep1")
        return one_department
    
    def resolve_multiple_department(self, info):
        one_department = Department(dep_id =1, name="dep1")
        two_department = Department(dep_id =2, name="dep2")
        three_department = Department(dep_id =3, name="dep3")
        four_department = Department(dep_id =4, name="dep4")
        list_data = []
        list_data.append(one_department)
        list_data.append(two_department)
        list_data.append(three_department)
        list_data.append(four_department)
        return list_data

    def resolve_dep_by_id(self, info, dep_id):
        one_department = Department(dep_id =1, name="dep1")
        two_department = Department(dep_id =2, name="dep2")
        three_department = Department(dep_id =3, name="dep3")
        four_department = Department(dep_id =4, name="dep4")
        list_data = []
        list_data.append(one_department)
        list_data.append(two_department)
        list_data.append(three_department)
        list_data.append(four_department)
        return next((x for x in list_data if x.dep_id == dep_id), None)

    


schema = graphene.Schema(query=Query)
