#LINQJS
Simple LINQ C# implementation for JavaScript

#Install [![Build Status](https://travis-ci.org/joaom182/linqjs.svg?branch=master)](https://travis-ci.org/joaom182/linqjs)
```
npm install linqjs
```
```
bower install jslinq
```

#Usage with Node
```
require('linqjs');
\\ Now all LINQ implementation are available.
```

#Usage to Front-end
```
<script src="bower_components/jslinq/linqjs.min.js"></script>
```

#Documentation

The following documentation will be segmented as follows: Aggregations, Iterations, Predicators, and Selectors.

##Selectors

####Select
Projects each element of a sequence into a new form.
```
var arr = [1, 2, 3, 4, 5];
var doubled = arr.select(function(t){ return t * 2 });  // [2, 4, 6, 8, 10]
```

####SelectMany
Projects each element of a sequence to an array and flattens the resulting sequences into one sequence.
```
var arr = [{Name:"A", Values:[1, 2, 3, 4]}, {Name:"B", Values:[5, 6, 7, 8]}];  
var res1 = arr.selectMany(function(t){ return t.Values });  // using default result selector
var res2 = arr.selectMany(function(t){ return t.Values }, function(t, u){ return {Name:t.Name, Val:u}});  // using custom result selector
```

####Take
Returns a specified number of contiguous elements from the start of a sequence.
```
var arr = [1, 2, 3, 4, 5];
var res = arr.take(2);  //  [1, 2]  
```

####Skip
Bypasses a specified number of elements in a sequence and then returns the remaining elements.
```
var arr = [1, 2, 3, 4, 5];
var res = arr.skip(2);  //  [3, 4, 5]
```

####First
Returns the first element of a sequence.
```
var arr = [1, 2, 3, 4, 5];
var t1 = arr.first(); // 1
var t2 = arr.first(function(t){ return t > 2 });  // using comparer: 3
var t3 = arr.first(function(t){ return t > 10 }, 10);  // using comparer and default value: 10
```

####Last
Returns the last element of a sequence.
```
var arr = [1, 2, 3, 4, 5];
var t1 = arr.last(); // 5
var t2 = arr.last(function(t){ return t > 2 });  // using comparer: 5
var t3 = arr.last(function(t){ return t > 10 }, 10);  // using comparer and default value: 10  
```

####Union
Produces the set union of two sequences by using the default equality comparer.
```
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [5, 6, 7, 8, 9];
var res = arr1.union(arr2);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]  
```

####Intersect
Produces the set intersection of two sequences.
```
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [1, 2, 3];
var res = arr1.intersect(arr2);  // [1, 2, 3]  
```

####Except
Produces the set difference of two sequences.
```
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [2, 3, 4];
var res = arr1.except(arr2);  // [1, 5]
```

####Distinct
Returns distinct elements from a sequence by using the default equality comparer to compare values.
```
var arr1 = [1, 2, 2, 3, 3, 4, 5, 5];
var res1 = arr.distinct();  // [1, 2, 3, 4, 5]

var arr2 = [{Name:"A", Val:1}, {Name:"B", Val:1}];
var res2 = arr2.distinct(function(a, b){ return a.Val == b.Val });  // [{Name:"A", Val:1}]
```

####Zip
Applies a specified function to the corresponding elements of two sequences, which produces a sequence of the results.
```
var arr1 = [1, 2, 3, 4];
var arr2 = ["A", "B", "C", "D"];
var res = arr1.zip(arr2, function(a, b){ return {Num:a, Letter:b} });
// [{Num:1, Letter: "A"},{Num:2, Letter: "B"}, {Num:3, Letter: "C"}, {Num:4, Letter: "D"}]
```

####IndexOf
Returns the index of the first occurrence of a value in a one-dimensional Array or in a portion of the Array.
```
var arr = [1, 2, 3, 4, 5];
var index = arr.indexOf(2);  // 1
```

####LastIndexOf
Returns the index of the last occurrence of a value in a one-dimensional Array or in a portion of the Array.
```
var arr = [1, 2, 3, 4, 5, 3, 4, 5];
var index = arr.lastIndexOf(3);  // 5
```

####Remove
Removes the first occurrence of a specific object from the Array.
```
var arr = [1, 2, 3, 4, 5];
arr.remove(2);   // [1, 3, 4, 5]
```

####RemoveAll
Removes all the elements that match the conditions defined by the specified Predicate.
```
var arr = [1, 2, 3, 4, 5];
arr.removeAll(function(t){ return t % 2 == 0 });  // [1, 3, 5]  
```

####OrderBy
Sorts the elements of a sequence in ascending order according to a key.
```
var arr = [{Name:"A", Val:1}, {Name:"a", Val:2}, {Name:"B", Val:1}, {Name:"C", Val:2}];

var res1 = arr.orderBy(function(t){ return t.Name });

var res2 = arr.orderBy(function(t){ return t.Name }, function(a, b){
    if(a.toUpperCase() > b.toUpperCase()) return 1;
    if(a.toUpperCase() < b.toUpperCase()) return -1;
    return 0;
});
```

####OrderByDescending
Sorts the elements of a sequence in descending order.
```
var arr = [{Name:"A", Val:1}, {Name:"a", Val:2}, {Name:"B", Val:1}, {Name:"C", Val:2}];
var res = arr.orderByDescending(function(t){ return t.Name });
```

####ThenBy / ThenByDescending
Performs a subsequent ordering of the elements in a sequence in ascending/descending order by using a specified comparer. ThenBy and ThenByDescending are defined to extend the output type of OrderBy and OrderByDescending, which is also the return type of these methods. This design enables you to specify multiple sort criteria by applying any number of ThenBy or ThenByDescending methods.
```
var arr = [{Name:"A", Val:1}, {Name:"a", Val:2}, {Name:"B", Val:1}, {Name:"C", Val:2}];

var res1 = arr.orderBy(function(t){ return t.Val })
          .thenBy(function(t){ return t.Name });

var res2 = arr.orderBy(function(t){ return t.Val })
          .thenByDescending(function(t){ return t.Name });

var res3 = arr.orderByDescending(function(t){ return t.Val })
          .thenBy(function(t){ return t.Name });
```

####InnerJoin
Correlates the elements of two sequences based on matching keys.
```
var arr1 = [{Name:"A", Val:1}, {Name:"B", Val:2}, {Name:"C", Val:3}];

var arr2 = [{Code:"A"}, {Code:"B"}, {Name:"C", Code:"C"}];

var res1 = arr1.innerJoin(arr2,
    function (t) { return t.Name },                                      // arr1 selector
    function (u) { return u.Code },                                      // arr2 selector
    function (t, u) { return { Name: t.Name, Val: t.Val, Code: u.Code } });  // result selector

// using custom comparer
var res2 = arr1.innerJoin(arr2,
    function (t) { return t.Name },                                    // arr1 selector
    function (u) { return u.Code },                                    // arr2 selector
    function (t, u) { return { Name: t.Name, Val: t.Val, Code: u.Code } },  // result selector
    function (a, b) { return a.toUpperCase() == b.toUpperCase() });         // comparer
```

####GroupJoin
Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.
```
var arr1 = [{Name:"A", Val:1}, {Name:"B", Val:2}, {Name:"C", Val:3}];
var arr2 = [{Code:"A"}, {Code:"A"}, {Code:"B"}, {Code:"B"}, {Code:"C"}];  

var res1 = arr1.groupJoin(arr2,
    function(t){ return t.Name },                     // arr1 selector
    function(u){ return u.Code },                     // arr2 selector
    function(t, u){ return {Item:t, Group:u} }) ;         // result selector  

// using custom comparer  
var res2 = arr1.groupJoin(arr2,
    function(t){ return t.Name },                             // arr1 selector
    function(u){ return u.Code },                             // arr2 selector
    function(t, u){ return {Item:t, Group:u} },                 // result selector
    function(a, b){ return a.toUpperCase() == b.toUpperCase() });     // comparer
```

####GroupBy
Groups the elements of a sequence according to a specified key Selector function.
```
var arr = [{Name:"A", Val:1}, {Name:"B", Val:1}, {Name:"C", Val:2}, {Name:"D", Val:2}];
var res = arr.groupBy(function(t){ return t.Val });
// [[{Name:"A", Val:1}, {Name:"B", Val:1}], [{Name:"C", Val:2}, {Name:"D", Val:2}]]

res.forEach(function(t){
    console.log("Key: " + t.key, "Length: " + t.length);
});
// Key: 1 Length: 2  
// Key: 2 Length: 2
```

####ToDictionary
Creates an object from an array according to a specified key Selector function.
```
var arr = [1, 2, 3, 4, 5];
var dic = arr.toDictionary(function(t){ return "Num" + t }, function(u){ return u });
// dic = {Num5: 5, Num4: 4, Num3: 3, Num2: 2, Num1: 1}
```


##Aggregations


####Aggregate
Applies an accumulator function over a sequence.
```
var arr = [1, 2, 3, 4, 5];
var sum = arr.aggregate(function(a, b){ return a + b }, 0);  // 15
```

####Min
Returns the minimum value in a sequence of values.
```
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
var min1 = arr.min();  // 1

var arr2 = [{Name:"A", Val:1}, {Name:"B", Val:2}];
var min2 = arr2.min(function(t){ return t.Val });   // 1
```

####Max
Returns the maximum value in a sequence of values.
```
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
var max1 = arr.max();  // 8

var arr2 = [{Name:"A", Val:1}, {Name:"B", Val:2}];
var max2 = arr2.max(function(t){ return t.Val });   // 2
```

####Sum
Computes the sum of a sequence of numeric values.
```
var arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
var sum1 = arr.sum();  // 36

var arr2 = [{Name:"A", Val:1}, {Name:"B", Val:2}];
var sum2 = arr2.sum(function(t){ return t.Val });   // 3
```


##Predicates

####Where
Filters a sequence of values based on a Predicate.
```
var arr = [1, 2, 3, 4, 5];
var res = arr.where(function(t){ return t > 2 }) ;  // [3, 4, 5]
```

####Any
Determines whether any element of a sequence exists or satisfies a condition.
```
var arr = [1, 2, 3, 4, 5];
var res1 = arr.any();  // true
var res2 = arr.any(function(t){ return t > 5 });  // false
```

####All
Determines whether all elements of a sequence satisfy a condition.
```
var arr = [1, 2, 3, 4, 5];
var res = arr.all(function(t){ return t < 6 });  // true
```

####TakeWhile
Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var res = arr.takeWhile(function(t){ return t % 4 != 0 });  // [1, 2, 3]
```

####SkipWhile
Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var res = arr.skipWhile(function(t){ return t % 4 != 0 }) ;   // [ 4, 5, 6, 7, 8]
```

####Contains
Determines whether a sequence contains a specified element.
```
var arr1 = [1, 2, 3, 4, 5];
var res1 = arr.contains(2);  // true

var arr2 = [{Name:"A", Val:1}, {Name:"B", Val:1}];
var res2 = arr2.contains({Name:"C", Val:1}, function(a, b){ return a.Val == b.Val }) ;  // true
```


##Iterations

####Range
Returns a numerical sequence based on the start and end parameters
```
var range = Array.range(1, 5); // [1,2,3,4,5];
```

####ForEach
Performs the specified action on each element of the array.
```
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(t){ if(t % 2 ==0) console.log(t); });
```

####DefaultIfEmpty
Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
```
var arr = [1, 2, 3, 4, 5];
var res = arr.where(function(t){ return t > 5 }).defaultIfEmpty(5);  // [5]  
```

#License
MIT © [João M.](https://twitter.com/joaom182)
