# Extension for dynamic unit conversion in urlbar

## Instructions
1. Clone this repo and install the dependencies.
2. web-ext build
3. In Firefox, set the pref extensions.experiments.enabled to true. Then open about:debugging.
4. Install the .zip file created by web-ext build as a temporary add-on.

## How to use
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/kChK0k1AYF0/0.jpg)](https://www.youtube.com/watch?v=kChK0k1AYF0RE)

## Supported converters
### Length
Search example:
+ `1cm in inch`

Supporetd units:
+ `meter`, `m`, `nanometer`, `micrometer`, `millimeter`, `mm`, `centimeter`, `cm`, `kilometer`, `km`, `mile`, `yard`, `foot`,  `inch`

### Mass
Search example:
+ `1kg in ton`

Supported units:
+ `kilogram`, `kg`, `gram`, `g`, `milligram`, `mg`, `ton`, `t`, `longton`, `l.t.`, `l/t`, `shortton`, `s.t.`, `s/t`, `pound`, `lbs`, `lb`, `ounce`, `oz`, `carat`, `ffd`

### Temperature
Search example:
+ `1c in fahrenheit`

Supported units:
+ `celsius`, `c`, `kelvin`, `k`, `fahrenheit`, `f`

### Timezone
Search example:
+ `10:00 jst in pst`
+ `10am jst in pst`
+ `10am in pst`
+ `now in pst`
+ `10am pst in here`

Supported timezones:
+ `IDLW`, `NT`, `HST`, `AKST`, `PST`, `AKDT`, `MST`, `PDT`, `CST`, `MDT`, `EST`, `CDT`, `EDT`, `AST`, `GUY`, `ADT`, `AT`, `UTC`, `GMT`, `Z`, `WET`, `WEST`, `CET`, `BST`, `IST`, `CEST`, `EET`, `EEST`, `MSK`, `MSD`, `ZP4`, `ZP5`, `ZP6`, `WAST`, `AWST`, `WST`, `JST`, `ACST`, `ACDT`, `AEST`, `AEDT`, `NZST`, `IDLE`, `NZD`.

