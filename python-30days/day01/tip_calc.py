import math

def calc_per_person(total: float, people: int, tip_pct: float = 0.10) -> int:
    """
    >>> calc_per_person(10000, 3, 0.15)
    3834
    """
    if people <= 0:
        raise ValueError("人数は 1 人以上にしてください.")
    pay_total = total * (1 + tip_pct)
    return math.ceil(pay_total / people)

if __name__ == "__main__":
    total = float(input("合計金額 (円): "))
    people = int(input("人数: "))
    tip_pct = float(input("チップ率 (0.1 = 10%): "))
    each = calc_per_person(total, people, tip_pct)
    print(f"1 人あたり {each:,} 円です 💰")
