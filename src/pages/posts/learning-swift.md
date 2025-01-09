---
layout: ../../layouts/BlogPost.astro
title: 'Learning Swift: Day 1'
author: 'Sidney Silva'
description: 'My first day following the 100 day Swift challenge.'
date: '9 Jan 2025'
url: 'posts/learning-swift'
---

```swift
var greeting = "Welcome to my post!"
```

So I've have been trying to learn iOS development for the past couple of months but I never found a good resource to start. Until now.

I recently joined a Youtuber's Discord server. His name is [isak](https://www.youtube.com/@isak). I have to say that the tiny little comunnity that he created (both Discord's and Youtube's) are very friendly and you can really find good people that will help you.

I asked for a resource to learn iOS development and isak sent a link to [hackingwithswift.com](https://www.hackingwithswift.com). I visited the webpage, saw a little bit of the topics and more and I really have to say that is a very good resource for now. The author is very friendly, explains well and the tutorials are very pleasing to read (or watch).

I went through the Day 1 of the course, where you can learn about declaring variables, how they work, types, etc; and built my very first project: A Celcius to Fahrenheit program. It'a a very simple project but it's really useful to learn the basics and in this post, I will explain a little bit about the program.

Here's the code:

```swift
import UIKit

let temperatureInCelsius = 31.0

let temperatureInFahrenheit = temperatureInCelsius * 1.8 + 32

print(temperatureInCelsius)
print(ceil(temperatureInFahrenheit))
```

In Swift you can declare variables and constants. To declare a variable, you have to use `var`, and to declare constants `let`:

```swift
// Declaration of a variable:
var number = 1
number++ 

// Declaration of a constant:
let maxNumberOfPeople = 10
maxNumberOfPeople = 23 // Error
```

So, in the program, the first constant that I'm declaring is `temperatureInCelsius`, to store the temperature in Celsius.

Once I created the constant, on the following line I declared another constant called `temperatureInFahrenheit`, where I transform the variable `temperatureInCelsius` to Fahrenheit using the formula (Fahrenheit = (Celsius * 9 / 5) + 32). Because 9 / 5 is 1.8, I just put Celcius * 1.8...

Then I just print the 2 values using the `print()` function. The second one has a `ceil()` function that rounds up doubles, so I don't have an ugly number.

And that's it. The rest of the things that I learned is on my Github repo: [sxdny / hackingwithswift](https://github.com/sxdny/hackingwithswift), where I'll post my path of becoming the best iOS developer of the whole world (I just want to get a job).

Thank you very much and see you on my next post!
