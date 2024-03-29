package com.ahntech.backend.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
public class Stars {
    private int number;
    private int total;

    public Stars(int number, int total) {
        this.number = number;
        this.total = total;
    }

    @Override
    public String toString() {
        return "stars{" +
                "number=" + number +
                ", total=" + total +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Stars stars)) return false;
        return number == stars.number && total == stars.total;
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, total);
    }
}
