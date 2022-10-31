package mo.com.excerise2;

public class Node {
        private Integer des;
        public Node(){

        }
        public Node(Integer des) {
            this.des = des;
        }

        public Integer getDes() {
            return des;
        }

        public void setDes(Integer des) {
            this.des = des;
        }

        @Override
        public String toString() {
            return "Node{" +
                    "des=" + des +
                    '}';
        }


}
