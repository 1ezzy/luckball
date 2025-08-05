call current week and compare to most recent saved week

if saved week is less than current week
    if saved week is in threshold of previous three weeks (last week, week before, week before)
        for each week in the threshold
            check if user was on a team
            check if their team won
            
            if team won
                add win to localStorage
                increment winStreak in localStorage
            if team lost 
                add loss to localStorage
                reset win streak in localStorage
