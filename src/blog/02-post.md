---
title: 'Learning Swift: Day 2'
author: 'Sidney Silva'
description: 'Arrays, enums, dictionaries and more!'
pubDate: '01/10/2025'
tags: ["Swift", "iOS Development"]
url: 'posts/02-post'
---

Day 2 Learning Swift so I can get a job (and avoid habit tracking apps with expensive subscriptions). Please hire me Apple.

# Arrays and Types

Today I learned about storing data in arrays and Typing variables. First, I'll be explaining how to store data using, not only Arrays, but Enums, Dictionaries and more.

Here's a list with a little bit of explanation:

- **Array**. Just like any other language, in Swift, you can store data using Arrays.
- **Sets**. This is like Arrays, but with faster data access and it can only store unique items. It's faster because when using Sets, the items inside are not in a particular order.
- **Enums**. This is new to me. Enums allows us to store different values in one same Object, so when declaring a new variable we can use this values and avoid mistakes when declaring variables.
- **Dictionaries**. Basically a `json` object. Dictionaries can store key-value items.

## Arrays

Arrays allow you to store a collection of items. It's the simplest way to do it in every single programming language.

To declare an Array, we can use:

```swift
var numbers = [1, 2, 3, 4]
let alphabet = ["a", "b", "c",...]
```

If we want to access the items stored inside, we can do it like this:

```swift
print(numbers[0]) // This prints the first element of `numbers`. -> 1
```

If we want to add elements, we can use the `.append()` function, just like `.push()` in JavaScript:

```swift
numbers.append(5) // [1, 2, 3, 4, 5]
```

Arrays doesn't allow storing different type of data inside the same Array. For example, you can't store a `String`, `Int`, `String` inside the same array:

```swift
let elements = [1, "John", 2.4] // Error
```

Now, to declare Arrays without any elements, wee need to do it this way:

```swift
var scores = Array<Int>() // Only numbers
var scores = [Int]() // Also works / pro way
```

As you can see, we need to specialize the Type of the elements that will be inside the array. We can't just declare en empty array without any Type and see if Swift can guess what we'll store inside.

To know how many items are in a array, you can use the `.count` function, just like `.length` in JavaScript or any other language:

```swift
print(albums.count)
```

To delete items, you can use:

```swift
characters.remove(2) // remove the element at index 2
characters.removeAll() // remove all the characters
```

You can check if an array contains a particular element with `contains()`:

```swift
albums.contains("Whole Lotta Red")
```

And you can also sort the array:

```swift
// Alphabetically
letters.sorted()

// and in ascending order
numbers.sorted()
```

And yeah, you can also reverse the elements of the array:

```swift
let presidents = ["Bush", "Obama", "Trump", "Biden", "Trump"]
let reversedPresidents = presidents.reversed()
print(reversedPresidents)
```

---

# Sets and Enums

## Set

Sets are similar to arrays, except **you can’t add duplicate items**, and they don’t store their items in a particular order.

Example:

```swift
let people = Set(["Denzel Washington", "Tom Cruise", "Nicolas Cage", "Samuel L Jackson"])
```

To add elements, we wont's will be using the `append()` function, because we are no longer adding the elements at the end of the array, we are inserting them in a "random" position. We need to use the `.insert()` function:

```swift
var people = Set<String>()
people.insert("Denzel Washington")
```

They are very useful if we don't want to have the elements sorted and we just need to acces to the elements in a fast way.

## Enums

They let us define a new data type with a handful of specific values that it can have. Think of a Boolean, that can only have true or false – you can’t set it to “maybe” or “probably”, because that isn’t in the range of values it understands. Enums are the same: we get to list up front the range of values it can have, and Swift will make sure you never make a mistake using them.

```swift
enum Weekday {
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
}
// or
enum Weekday {
    case monday, tuesday, wednesday, thursday, friday
}
```

Now, rather than using `String`, we could use the enum:

```swift
var day = Weekday.monday
day = Weekday.tuesday
day = Weekday.friday

// or

var day = Weekday.monday
day = .tuesday
day = .friday
```
---

# Dictionary

A Dictionary is a collection whose elements are key-value pairs, just like a `json` object.

We can convert this:

```swift
let person = ["Sidney Silva", "Brazil", "08/08/2004"]
```

To a dictionary:

```swift
let person = [
    "name": "Sidney Silva",
    "placeOfBirth": "Brazil", 
    "dateOfBirth": "08/08/2004"
]
```

So, we can acces the value of the keys by doing this:

```swift
print(person["name"]) // "Sidney"
```
A little bit meh but it's okay.

You can also create empty dictionaries:

```swift
var heights = [String: Int]()
heights["Yao Ming"] = 229
heights["Shaquille O'Neal"] = 216
// ...

// if you need to rewrite the value
heights["Yao Ming"] = 228
```

---

# Type annotations

We can be explicit about the data we want:

```swift
let surname: String = "Silva Braz de Oliveira"
var age: Int = 20
```

That's it, nothing more to explain. I love TypeScript by the way.

---

So this i everything for today. Now, the 'code challenge':

> This time the challenge is to create an array of strings, then write some code that prints the number of items in the array and also the number of unique items in the array.

The XCode auto-completion accidentally made it for me because I forgot to disable, so I came with the solution in seconds. I was about to create a `for` loop, compare the elements, count how many times do they repeat, store them in a another variable if they do not repeat, bla bla bla, but is seems like the good aproach is this one:

```swift
import UIKit

let arrString: [String] = ["Sidney", "London", "New York", "Madrid", "Barcelona", "Sidney", "Barcelona", "New York"]
let uniqueElements: [String] = Array(Set(arrString))

print("Number of elements of the array: \(arrString.count)")
print("Number of unique elements: \(uniqueElements.count)")
```

We just need to create a new Array based on the original one but using `Set`, because when passing the original array to the `Set` constructor, this one deletes the duplicate elements. It's that easy.

That's it. Thank you if you are reading this and God bless you. 🙌🏽