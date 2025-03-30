n=input("Enter a string:")
d={}
a=list(n)
b=list(set(a))
for i in b:
    d[i]=a.count(i)
print(d)    
