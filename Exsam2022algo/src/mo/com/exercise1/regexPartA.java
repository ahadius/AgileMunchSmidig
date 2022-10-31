package mo.com;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class regexPartA {
    // task one
    String questionUrl1 = "/solutions/src/test/java/org/pg4200/sol10/RegexExampleImpTest.java";
    String s1 ="(?im)^\\/.*?\\btest\\/.*\\/.*test.*\\.(?:java|cpp|kt)$";


    // taskTwo
    String questionUrl2 = "@Bogdan: Are the exercises for the PGR112 exam ready?";
    String s2 = "(?im)^@.+:\\s(?=.*(?:(?:[pg]{2}[A-z]{0,1}[0-9]{3,4})|\\b(?:programming|programmering)\\b))(?=.*\\b(?:exam|eksamen)\\b).*\\?$";

    Pattern pt = Pattern.compile(s1);
    Matcher mt = pt.matcher(questionUrl1);
    boolean result = mt.matches();
}
