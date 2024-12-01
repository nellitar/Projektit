namespace t10;

public partial class MainPage : ContentPage
{

	public MainPage()
	{
		InitializeComponent();
	}

	public double BMI()
	{
		double dPituus = double.Parse(pituus.Text);
		double dPaino = double.Parse(paino.Text);
		double BMITulos = dPaino / (dPituus * dPituus);
		return BMITulos;
	}

	private void OnCounterClicked(object sender, EventArgs e)
	{
		double BMITulos = BMI();

		int rivi = 0;

		if (BMITulos < 17)
		{
			rivi = 1;
		}

		else if (BMITulos > 17 && BMITulos < 18.5)
		{
			rivi = 2;
		}
        else if (BMITulos > 18.5 && BMITulos < 25)
        {
            rivi = 3;
        }
        else if (BMITulos > 25 && BMITulos < 30)
        {
            rivi = 4;
        }
        else if (BMITulos > 30 && BMITulos < 35)
        {
            rivi = 5;
        }
        else if (BMITulos > 35 && BMITulos < 40)
        {
            rivi = 6;
        }
        else if (BMITulos > 40)
        {
            rivi = 7;
        }

		highLightRow(rivi);
    }

	void highLightRow(int rivi)
	{
		foreach (View x in gridi)
		{
			if (x.GetType() == typeof(Label) && gridi.GetRow(x) == rivi)
			{
				x.BackgroundColor = Colors.LightGreen;
			}
			else if (x.GetType() == typeof(Label))
			{
				x.BackgroundColor = Colors.Transparent;
			}


		}
	}
}

